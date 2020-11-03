"use strict"
const HermitPurple = require('../index.js').default;

const wikia = new HermitPurple("jojo", 5);
const startTime = Date.now();

wikia.searchResults('Josuke Higashikata').then(results => {
  console.log(results);

  console.log(`Fetched ${results.length} search results in ${Date.now() - startTime}ms.`);
});
