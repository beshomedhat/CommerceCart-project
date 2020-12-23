require('./db/moongse')
const express = require('express')
const app = express()

const customerRoutes = require('./routes/customer')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')

const port = process.env.PORT || 3000

app.use(express.json())

app.use(customerRoutes);
//app.use(orderRoutes)
//app.use(productRoutes)

app.listen(port)