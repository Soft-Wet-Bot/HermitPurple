"use strict"
const HermitPurple = require('../index.js').default;

const wikia = new HermitPurple("jojo", 1);
const startTime = Date.now();

wikia.search('Josuke Higashikata').then(results => {
  console.log(results[0]["title"]);

  console.log(`Fetched ${results.length} articles in ${Date.now() - startTime}ms.`);
});
