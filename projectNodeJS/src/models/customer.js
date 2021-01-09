const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Order = require('./order')
const Cart = require('./cart')
const jwt = require('jsonwebtoken')

const CustSchema = new mongoose.Schema({
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
    status:{
        type:Boolean,
        default: true
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value,'ar-EG')) throw new Error ('invalid phone')
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    pass:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true
    },
    tokens:[{
        token:{type:String}
    }]
})

CustSchema.virtual('Order',{
    ref:'Order', localField:'_id', foreignField:'customerId'
})

CustSchema.virtual('Cart',{
    ref:'Cart', localField:'_id', foreignField:'customerId'
})

CustSchema.methods.toJSON=function(){
    const customer = this
    const userOBJ = customer.toObject()
    delete userOBJ.pass
    delete userOBJ.tokens
    return userOBJ
}

CustSchema.pre('save',async function(next){
    const customer = this
    if(customer.isModified('pass')){
        customer.pass = await bcrypt.hash(customer.pass,12)
    }
    next()
})


CustSchema.statics.findByCredentials = async function(email, pass){
    const user= await Customer.findOne({ email })
    if(!user) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, user.pass)
    if(!matched) throw new Error('unauthorized')
    return user    
}

CustSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},"AaAaBbBb")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

CustSchema.methods.removeToken = async function(token){
    
    let tokens = this.tokens;
    for(let i=0; i<tokens.length; i++){
        if(tokens[i].token === token){
            this.tokens.splice(i,1)
            await this.save()
            return true
        }
    }
    
    return false;
}

CustSchema.methods.removeAllToken = async function(token){
    
    this.tokens = [];
    await this.save()
    return true
}

const Customer = mongoose.model('Customer',CustSchema)
module.exports = Customer;