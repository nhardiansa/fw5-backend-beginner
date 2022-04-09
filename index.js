const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const {
  APP_PORT,
  PORT
} = process.env;

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

// handling unregistered routes
[
  'get',
  'post',
  'put',
  'patch',
  'delete'
].forEach(el => {
  app[el]('*', (req, res) => {
    res.status(404);
    res.json({
      success: false,
      message: 'Destination not found'
    });
  });
});

app.listen(PORT || APP_PORT, () => {
  console.log(`App is running in port ${PORT || APP_PORT}`);
});
