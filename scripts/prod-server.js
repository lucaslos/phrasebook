const path = require('path');
const express = require('express');
const portfinder = require('portfinder');
const { name, version, directories } = require('../package.json');

const app = express();

const staticPath = path.join(__dirname, `${directories.build}/`);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <h1>
          <a href="/${name.replace(' ', '_')}/">${name} v${version}</a>
        </h1>
      </body>
    </html>
  `);
});

app.get(`/${name.replace(' ', '_')}/*`, (req, res) => {
  const file = req.params[0] ? req.params[0] : 'index.html';
  console.log(`serve file: ${file}`);
  res.sendfile(file, { root: `./docs/` });
});


portfinder.basePort = 5050;

portfinder.getPort((err, port) => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Prod server listening on port ${port}`);
  });
});
