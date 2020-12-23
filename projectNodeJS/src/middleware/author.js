const jwt = require('jsonwebtoken')
const Customer = require('../models/customer')

const auth = async(req,res,next)=>{
    try{
        const token = req.header("Auth").replace("Bearer ","")
        const decodedToken = jwt.verify(token,"AaAaBbBb")
        const data = await Customer.findOne({
            _id: decodedToken._id, 
            'tokens.token':token
        })
        if(!data) throw new Error()
        req.token = token
        req.data = data
        next();
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"auth err"
        })
    }
    
}

module.exports = auth;