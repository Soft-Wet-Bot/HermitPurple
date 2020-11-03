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
    const articles = [];
    $('.unified-search__result__title').each((x, y) => {
      if (x >= this.limit) return false; //break. y starts at 0.
      const obj = {
        url: $(y).prop('href'),
        id: $(y).prop('data-page-id'),
        title: $(y).prop('data-title')
      }
      if (obj.id) {
        articles.push(obj);
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
   * @param {object} article An article from _getSearchData
   * @returns {object} Results
   */
  async getArticle(article) {
    if (!article.hasOwnProperty("url")) throw new Error('Partial article passed into getArticle()')
    const webPage = await this._downloadPage(article.url)
    const reply = article
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

    reply["article"] = text.join(" ").replace(/(\r\n|\n|\r)|(\[\d+\])/gm, ""); //remove newlines and all num anchors ([0-9])

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
   * @param {string} query The string to search for on wikia
   * @returns {array} Array of basic info of the articles found
   */
  async searchResults(query) {
    const webPage = await this._fetch(query);
    const articles = this._getSearchData(webPage);
    if (articles.length === 0) throw new Error('No articles found')

    return articles;
  }

  /**
   * @param {string} query The string to search for on wikia
   * @returns {array} Array with info from all found articles
   */
  async search(query) {
    const articles = await this.searchResults(query);
    const articleData = [];
    for (let i = 0; i < articles.length; i++) {
      articleData.push(await this.getArticle(articles[i]))
    }

    return articleData;
  }
}
module.exports = HermitPurple;
