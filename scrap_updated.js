const fs = require('fs');
const scraper = require('website-scraper');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');

const options = {
  urls: ['https://www.theverge.com/'],
  directory: './verge-articles',
  maxDepth: 1,
  recursive: true,
};

scraper(options, (error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  const articles = [];

  result[0].textFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(fileContent);
    const title = $('h2.c-entry-box--compact__title').text().trim();
    const content = $('div.c-entry-content').text().trim();
    articles.push({ title, content });
  });

 
  const csv = new ObjectsToCsv(articles);
  csv.toDisk('./verge-articles.csv');

  console.log(`Scraped ${articles.length} articles and saved as CSV file!`);
});
