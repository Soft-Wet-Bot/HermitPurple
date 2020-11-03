![img](https://i.imgur.com/2NCC0bi.png)

# This scrapper is a modified version of [@yimura/scraper](https://github.com/Yimura/Scraper), check it out!

## Why use this scrapper?

Some wikia/fandom pages have switched to mediawiki or have some apis disabled.

## Example Code

CommonJS:
```js
const HermitPurple = require('hermitpurple').default;

const wikia = new HermitPurple("jojo", 1); // fandom, search limit

wikia.search('Josuke Higashikata').then(results => {
    console.log(results);
});
```

ESModule:
```js
import hermitpurple from 'hermitpurple'

const wikia = new hermitpurple.default("jojo", 1); // fandom, search limit
wikia.search('Josuke Higashikata').then(results => {
    console.log(results);
});
```

## Example Result

```js
[
  {
    id: '11883',
    url: 'https://jojo.fandom.com/wiki/Josuke_Higashikata_(JoJolion)',
    img: 'https://static.wikia.nocookie.net/jjba/images/d/d2/Jo2uke.png/revision/latest/scale-to-width-down/  350?cb=20200105132036',
    article: `The tentatively-named Josuke Higashikata (東方 定助, Higashikata Jōsuke) is the protagonist of JoJolion. He   is the eighth JoJo of the JoJo's Bizarre Adventure series. Josuke is a young man afflicted with retrograde amnesia,   lacking any memories prior to being discovered by Yasuho Hirose near the Wall Eyes in Morioh Town. He dedicates   himself to discovering his former identity and those originally associated with him. Josuke's original identity was   that of Josefumi Kujo (空条 仗世文, Kūjō Josefumi), and became his current self after fusing with the man Yoshikage  Kira (吉良 吉影, Kira Yoshikage). Josuke is a Stand User and retains his original identity's Soft & Wet. Josuke is a  young, handsome and physically fit man of above-average height. He wears a tasseled "Dixie cup" sailor cap (in  multiple illustrations, it is adorned with the same palm insignia as Jotaro Kujo's hat). He wears a sailor suit, cut  with a wide neck and above the navel, a neckerchief with a button resembling a slotted screw head, large emblems of   an anchor on his right side and a compass rose on his left, fitted pants with a belt, and a pair of high-top athletic   shoes. After partaking in an equivelant exchange to save his life. Josuke has segmented rocks which form a  running...`,
    title: 'Josuke Higashikata'
  }
]

```

## Other functions

`HermitPurple#searchResults`: returns an array of the search results, without fetching the articles
`HermitPurple#getArticle`: returns and fetches only the provided article

> For examples look in the `test/` folder
