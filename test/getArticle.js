"use strict"
const HermitPurple = require('../index.js').default;

const wikia = new HermitPurple("jojo", 1);

wikia.searchResults('Josuke Higashikata').then(results => {
  const startTime = Date.now();
  wikia.getArticle(results[0]).then(article => {
    console.log(article)

    console.log(`Fetched 1 article in ${Date.now() - startTime}ms.`);
  })
});
