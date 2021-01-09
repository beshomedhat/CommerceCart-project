const Customer = require('../models/customer')
const express = require('express')
const auth = require('../middleware/author')
const authAdmin = require('../middleware/adminAuthor')
const router = new express.Router()

//-------------- register Customer ------------------------
router.post('/custRegister',async (req,res)=>{

    try{
        const data = new Customer(req.body)
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

//-------------- get all Customer ------------------------
router.get('/allCustomer',authAdmin,async (req,res)=>{

    try{
        const data = await Customer.find({})
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


//-------------- edit Customer ------------------------
router.patch('/custEditInfo',auth, async(req,res)=>{
    
    const _id= req.data._id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["name","status","address","phone","pass","email"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const customer = await Customer.findByIdAndUpdate(_id, updates,
            {
            new:true,
            runValidators:true
        })
        if(!customer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"Customer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: customer, 
            msg:"Customer data updated successfuly"
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

//-------------- delete Customer ------------------------
router.delete('/custDeleteAccount',auth, async(req,res)=>{
    const _id= req.data._id
    try{
        const customer = await Customer.findByIdAndDelete(_id)
        if(!customer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"Customer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: customer, 
            msg:"Customer data deleted successfuly"
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
router.post('/custLogin', async(req,res)=>{
    try{
        const customer = await Customer.findByCredentials(req.body.email, req.body.pass)
        const token = await customer.generateToken()
        res.send({
            status:1,
            data:customer,
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
router.get('/custProfile', auth,async(req,res)=>{
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

// 
//-----------logOut--------------------------------------
router.post('/custLogout', auth, async(req, res)=>{
    try{
        req.data.tokens = req.data.tokens.filter( token =>{
            return token.token != req.token
        })
        await req.data.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out"
        })
    }
    catch(e){
        res.status(500).send({
            status: 0,
            data: e,
            message: "Unauthorized user"
        })
    }
})

//-----------logOutAll--------------------------------------
router.post('/custLogoutAll', auth, async(req, res)=>{
    try{
        req.data.tokens = []
        await req.data.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out"
        })
    }
    catch(e){
        res.status(500).send({
            status: 0,
            data: e,
            message: "Unauthorized user"
        })
    }
})

// 

//-----------islogged--------------------------------------
router.get('/custIsLogged', async(req, res)=>{
    try{
        const token = req.header("Auth")     
        if(!token) throw new Error()
        res.status(200).send({
            status:1,
            data:true,
            message:"logged"
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data:false,
            msg:"not logged"
        })
    }
})

module.exports = router



// //-------------- get one Customer ------------------------
// router.get('/customer/:id',async (req,res)=>{

//     try{
//         const _id = req.params.id
//         const data = await Customer.findById(_id)
//         if(!data){
//             res.status(200).send({
//                 status:2,
//                 data: data,
//                 msg:"not found"
//             })
//         }
//         res.status(200).send({
//             status:1,
//             data: data,
//             msg:"Customer found"
//         })
//     }
//     catch(e){
//         res.status(500).send({
//             status:0,
//             data: e,
//             msg:"error data"
//         })

//     }

// })