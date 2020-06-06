const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const departmentController = require('./controllers/departmentController');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-rr2xs.mongodb.net/http_app?retryWrites=true',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use('/departments', departmentController);
app.use('/products', productController);

app.listen(3000);