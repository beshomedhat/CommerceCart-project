const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require('./order')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        minLenrth:10,
        maxLenrth:50,
        validate(val){
            if(!validator.isAlphanumeric(val,'en-US')) throw new Error('invalid name')
        }
    },
    quantity:{
        type: Number,
        default:0
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type:String,
        required: true,
        trim: true,
        minLenrth:10,
        maxLenrth:50,
        validate(val){
            if(!validator.isAlphanumeric(val,'en-US')) throw new Error('invalid cat')
        }
    },
    image:{
        type:String,
        default:"images/default.svg"
    }
})
productSchema.virtual('Order',{
    ref:'Order', localField:'_id', foreignField:'productId'
})


const Product = mongoose.model('Product',productSchema)

module.exports = Product;