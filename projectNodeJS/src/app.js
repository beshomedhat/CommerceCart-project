require('./db/moongse')
const express = require('express')
const cors = require('cors')
const app = express()

const customerRoutes = require('./routes/customer')
const adminRoutes = require('./routes/admin')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

const port = process.env.PORT || 3000

const multer = require('multer')
app.use(cors())
app.use(express.json())

app.use(customerRoutes);
app.use(adminRoutes);
app.use(orderRoutes)
app.use(productRoutes)
app.use(cartRoutes)

app.listen(port)