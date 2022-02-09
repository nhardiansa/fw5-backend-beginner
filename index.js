const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.urlencoded({
  extended: true
}));

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

app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
});
