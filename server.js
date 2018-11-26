require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 1000;
const overviewUrl = process.env.OVERVIEW_URL || 'http://localhost:9001/';

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// })

app.get('/overview/restaurants/:id', proxy({
  target: overviewUrl
}))

app.post('/overview/restaurants/:restaurantId/images/', proxy({
  target: overviewUrl
}))

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
