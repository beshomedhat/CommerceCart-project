const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cartSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique:true,
        ref: 'Customer'
    },
    productsData:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        pName:{
            type:String,
            required: true,
        },
        pImage:{
            type:String,
        },
        pCategory:{
            type:String,
            required: true,
        },
        pQuantity:{
            type:Number,
            required: true,
        },
        priceForOne:{
            type:Number,
            required: true,
        },totalPrice:{
            type:Number,
            default:0
        }
    }],
})

const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart;