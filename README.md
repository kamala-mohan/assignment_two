First, we require three Node.js packages: cheerio, axios, and objects-to-csv. cheerio is a library that provides jQuery-like functionality for parsing HTML documents, axios is a library for making HTTP requests, and objects-to-csv is a library for converting JavaScript objects to CSV format.

Next, we define an async function called scrape, which is where the scraping logic resides.

Inside the scrape function, we use axios to send an HTTP GET request to https://www.theverge.com/. We destructure the data property from the response object to extract the HTML document that we will be parsing.

We then use cheerio to load the HTML document into a jQuery-like object, which we can then use to select and manipulate HTML elements. Specifically, we use $('h2.c-entry-box--compact__title') to select all h2 elements with the class c-entry-box--compact__title. These are the elements that contain the titles of the articles we want to scrape.

For each of these elements, we extract the title text and the content of the article. To get the content, we first select the parent element of the title ($(element).parent()) and then find the first p element within that parent element (find('p').first()).

We then push an object with title and content properties to an array called articles.

Finally, we create a new ObjectsToCsv instance with the articles array as its argument. We call the toDisk method of this instance to write the CSV data to a file named articles.csv in the current directory.

At the end, we call the scrape function to run the scraper.
