require('./db/moongse')
const express = require('express')
const app = express()

const customerRoutes = require('./routes/customer')
const adminRoutes = require('./routes/admin')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')

const port = process.env.PORT || 3000

const multer = require('multer')

app.use(express.json())

app.use(customerRoutes);
app.use(adminRoutes);
app.use(orderRoutes)
app.use(productRoutes)

app.listen(port)