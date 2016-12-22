// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only use a separate css file in prod.
var fs = require('fs');
var cheerio = require('cheerio');

/*eslint-disable no-console */

fs.readFile('client/index.html', 'utf8', (err, markup) => {
    if (err) {
        return console.log(err);
    }

    var $ = cheerio.load(markup);

    fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('index.html written to /dist');
    });
});
