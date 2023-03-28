const axios = require('axios');
const cheerio = require('cheerio');

const getArticleUrls = async () => {
  try {
    const response = await axios.get('https://www.theverge.com/');
    const $ = cheerio.load(response.data);
    const articleUrls = [];
    $('h2.c-entry-box--compact__title').each((index, element) => {
      const url = $(element).find('a').attr('href');
      articleUrls.push(url);
    });
    return articleUrls.slice(0, 10); // Return the first 10 articles
  } catch (error) {
    console.error(error);
  }
};

const getArticleContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $('h1.c-page-title').text();
    const content = $('div.c-entry-content').text();
    return { title, content };
  } catch (error) {
    console.error(error);
  }
};

const scrapeTheVerge = async () => {
  const articleUrls = await getArticleUrls();
  const articles = [];
  for (const url of articleUrls) {
    const article = await getArticleContent(url);
    articles.push(article);
  }
  console.log(articles);
};

scrapeTheVerge();
