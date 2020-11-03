"use strict"
const fetch = require('node-fetch'),
  cheerio = require('cheerio'),
  {
    FandomSearch
  } = require('./Constants.js');

class HermitPurple {
  constructor(fandom = "jojo", limit = 1) {
    this.limit = Number.isInteger(limit) ? limit : 1;
    this.wikiUrl = "https://" + fandom + ".fandom.com";
  }

  /**
   * @param {string} webPage The fandom webpage with search results
   * @returns {array} Articles found
   */
  _getSearchData(webPage) {
    const $ = cheerio.load(webPage);
    const articles = []; // [url, id]
    $('.unified-search__result__title').each((x, y) => {
      if (y > this.limit) return false; //break. y starts at 0.
      const arr = [$(y).prop('href'), $(y).prop('data-page-id')]
      if (arr[1]) {
        articles.push(arr);
      }
    });

    return articles;
  }

  /**
   * @param {string} pageUrl The webpage you want to download
   * @returns {string} Page source
   */
  async _downloadPage(pageUrl) {
    const res = await fetch(pageUrl);
    return res.text();
  }

  /**
   * @private
   * @param {array} article An article from _getSearchData
   * @returns {object} Results
   */
  async _getArticle(article) {
    const webPage = await this._downloadPage(article[0])
    const reply = {
      id: article[1],
      url: article[0]
    }
    const $ = cheerio.load(webPage);

    reply["img"] = $('.pi-image-thumbnail').prop("src") || $('.image').prop("href")

    // remove useless parts
    $("aside").remove();
    $(".cquote").remove();
    $("gallery").remove();

    const text = [];

    $('p').each((x, y) => {
      // check if empty
      if ($(y).text().replace(/\s/g, "") !== "") text.push($(y).text())
    });

    reply["article"] = text.join(" ").replace(/(\r\n|\n|\r)/gm, ""); //remove newlines
    reply["title"] = $("#firstHeading").text();

    return reply
  }

  /**
   * @private
   * @param {string} search_query
   * @returns {string} The query for the fandom page
   */
  async _fetch(search_query) {
    const searchUrl = this.wikiUrl + FandomSearch + encodeURIComponent(search_query);

    return await this._downloadPage(searchUrl)
  }

  /**
   * @param {string} query The string to search for on youtube
   */
  async search(query) {
    const webPage = await this._fetch(query);
    const articles = this._getSearchData(webPage);
    if (articles.length === 0) throw new Error('No articles found')

    const article = await this._getArticle(articles[0]);

    return article;
  }
}
module.exports = HermitPurple;
