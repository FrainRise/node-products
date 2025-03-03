const express = require('express');
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const app = express();

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)

module.exports = app;