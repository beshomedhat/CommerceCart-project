const Admin = require('../models/admin')
const express = require('express')
const authAdmin = require('../middleware/adminAuthor')
const router = new express.Router()

//-------------- register Admin ------------------------
router.post('/registerAdmin',async (req,res)=>{

    try{
        const data = new Admin(req.body)
        await data.save()
        const token = await data.generateToken()
        res.status(200).send({
            status:1,
            data: data,
            msg:"data inserted",
            token:token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:"error data",
            token:''
        })

    }
})

//-------------- get all Admins ------------------------
router.get('/allAdmins',authAdmin,async (req,res)=>{

    try{
        const data = await Admin.find({})
        res.status(200).send({
            status:1,
            length:data.length,
            data: data,
            msg:"data found"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:"error data"
        })

    }

})


//-------------- edit Admin ------------------------
router.patch('/editAdminInfo',authAdmin, async(req,res)=>{
    
    const _id= req.data._id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["name","email","pass"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const admin = await Admin.findByIdAndUpdate(_id, updates,
            {
            new:true,
            runValidators:true
        })
        if(!admin){
            res.status(200).send({
                status:2,
                data:"",
                msg:"admin not found"
            })
        }
        res.status(200).send({
            status:1,
            data: admin, 
            msg:"admin data updated successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:"",
            msg:"error edit data"
        })
    }
})

//-------------- delete admin ------------------------
router.delete('/deleteAdminAccount',authAdmin, async(req,res)=>{
    const _id= req.data._id
    try{
        const admin = await Admin.findByIdAndDelete(_id)
        if(!admin){
            res.status(200).send({
                status:2,
                data:"",
                msg:"admin not found"
            })
        }
        res.status(200).send({
            status:1,
            data: admin, 
            msg:"Admin data deleted successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})

//-------------------login---------------------------------
router.post('/adminLogin', async(req,res)=>{
    try{
        const admin = await Admin.findByCredentials(req.body.email, req.body.pass)
        const token = await admin.generateToken()
        res.send({
            status:1,
            data:admin,
            msg:"logged in",
            token:token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data",
            token:''
        })
    }
})

//-------------------profile---------------------------------
router.get('/adminProfile', authAdmin,async(req,res)=>{
    try{
        res.send({
            status:1,
            data: req.data,
            token: req.token

        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data"
        })
    }
})

//-------------------logout---------------------------------
router.post('/adminLogout',authAdmin, async(req,res)=>{
    try{
        const _id= req.data._id
        const admin = await Admin.findOne(_id);
        let check= admin.removeToken(req.token)
        if(!check){throw new Error('')}
        res.send({
            status:1,
            data:admin,
            msg:"logged out",
            
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data",
            token:''
        })
    }
})

//-------------------logout from all---------------------------------
router.post('/adminLogoutAll',authAdmin, async(req,res)=>{
    try{
        const _id= req.data._id
        const admin = await Admin.findOne(_id);
        let check= admin.removeAllToken(req.token)
        if(!check){throw new Error('')}
        res.send({
            status:1,
            data:admin,
            msg:"logged out from all",
            
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data",
            token:''
        })
    }
})

module.exports = router

