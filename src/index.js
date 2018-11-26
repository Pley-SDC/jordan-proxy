const express = require('express');
const morgan = require('morgan');
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const overviewStaticData = JSON.parse(require('../overviewStaticData.json'));
const Pictures = require('../../overview/client/components/pictures.jsx');

const app = express();
const port = process.env.PORT || 1000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  const overViewMarkup = renderToString(
    <Pictures restaurantData={overviewStaticData} />
  );
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Pley Proxy</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
      </head>
      <body>
        <div id="overview">${overViewMarkup}</div>
        <div id="main-container">
          <div id="middle-container">
            <div id="popular-dishes"></div>
            <div id="recommended-reviews"></div>
          </div>
          <div id="yump-reservation-hours"></div>
        </div>
      </body>
    </html>
  `);
})

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// })

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
