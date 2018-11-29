// require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;
const overviewUrl = process.env.OVERVIEW_URL || 'http://localhost:9001';
const reservationUrl = process.env.RESERVATION_URL || "http://ec2-3-16-181-60.us-east-2.compute.amazonaws.com:3002";
const reservationProxy = proxy({target: reservationUrl});

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/api/restaurant_id/reservation', reservationProxy);
app.get('/api/restaurant_id/hour', reservationProxy);

// app.post('/overview/restaurants/:restaurantId/images/', proxy({
//   target: overviewUrl
// }))

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
