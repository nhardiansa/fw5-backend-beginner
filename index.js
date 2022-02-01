const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.urlencoded({
  extended: true
}));

app.use(require('./src/routes'));

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
