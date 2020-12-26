const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const authAdmin = async(req,res,next)=>{
    try{
        const token = req.header("Auth").replace("Bearer ","")
        const decodedToken = jwt.verify(token,"AaAaBbBb")
        const data = await Admin.findOne({
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
            msg:"auth admin err"
        })
    }
    
}

module.exports = authAdmin;