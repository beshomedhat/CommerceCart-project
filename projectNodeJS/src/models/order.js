const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const orderSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        default:"ordered"
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    productIds:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        pQuantity:{
            type:Number,
            default:1
        }
    }],
    total:{
        type:Number,
        required:true
    }
})


const Order = mongoose.model('Order',orderSchema)

module.exports = Order;