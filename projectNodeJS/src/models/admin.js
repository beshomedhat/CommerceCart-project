const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
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

//-------------------------to delete pass & token in return data ----------------------------------
adminSchema.methods.toJSON=function(){
    const admin = this
    const userOBJ = admin.toObject()
    delete userOBJ.pass
    delete userOBJ.tokens
    return userOBJ
}

//------------------------to hash the password----------------------------------
adminSchema.pre('save',async function(next){
    const admin = this
    if(admin.isModified('pass')){
        admin.pass = await bcrypt.hash(admin.pass,12)
    }
    next()
})

//---------------------to get admin by email for login----------------------------------
adminSchema.statics.findByCredentials = async function(email, pass){
    const user= await Admin.findOne({ email })
    if(!user) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, user.pass)
    if(!matched) throw new Error('unauthorized')
    return user    
}


//------------------------to generate token for login & register-----------------------------------------
adminSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},"AaAaBbBb")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin;