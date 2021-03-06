require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;
const overviewUrl = process.env.OVERVIEW_URL || 'http://13.52.10.32';
const reservationUrl = process.env.RESERVATION_URL || 'http://ec2-3-16-181-60.us-east-2.compute.amazonaws.com:3002';
const dishesUrl = process.env.DISHES_URL || 'http://ec2-18-222-177-6.us-east-2.compute.amazonaws.com/';
const reviewsUrl = process.env.DISHES_URL || 'http://13.52.60.21:3003'

const reservationProxy = proxy({target: reservationUrl});
const overviewProxy = proxy({target: overviewUrl});
const dishesProxy = proxy({target: dishesUrl});
const reviewsProxy = proxy({target: reviewsUrl});

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.use('/api/:restaurant_id/reservation', reservationProxy);
app.use('/api/:restaurant_id/hour', reservationProxy);
app.use('/overview', overviewProxy);
app.use('/api/:restaurantId/menu', dishesProxy);
app.use('/api/:id', reviewsProxy);

// app.post('/overview/restaurants/:restaurantId/images/', proxy({
//   target: overviewUrl
// }))

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
