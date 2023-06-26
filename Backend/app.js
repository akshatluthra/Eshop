const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// app.use(errorHandler())

// Routes
const categoriesRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);


mongoose.connect('mongodb+srv://akshatluthra:akshat123@cluster0.zuk4izi.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database Connection has been ready')
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('server is running');
})