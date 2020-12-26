const Order = require('../models/order')
const express = require('express')
const auth = require('../middleware/author')
const authAdmin = require('../middleware/adminAuthor')
const router = new express.Router()

//-------------- make an order by customer ------------------------
router.post('/makeOrder',auth,async (req,res)=>{

    try{
        const data = new Order(req.body)
        data.customerId = req.data._id
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg:"data ordered"
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

//-------------- get all orders ------------------------
router.get('/allOrders',authAdmin,async (req,res)=>{

    try{
        const data = await Order.find({})
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


//-------------- edit order status by admin ------------------------
router.patch('/editOrder/:id',authAdmin, async(req,res)=>{
    
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["status"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const order = await Order.findByIdAndUpdate(_id, updates,
            {
            new:true,
            runValidators:true
        })
        if(!order){
            res.status(200).send({
                status:2,
                data:"",
                msg:"Order not found"
            })
        }
        res.status(200).send({
            status:1,
            data: order, 
            msg:"order status updated successfuly"
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

//-------------- delete order by admin ------------------------
router.delete('/deleteOrder',authAdmin, async(req,res)=>{
    const _id= req.params.id
    try{
        const order = await Order.findByIdAndDelete(_id)
        if(!order){
            res.status(200).send({
                status:2,
                data:"",
                msg:"Order not found"
            })
        }
        res.status(200).send({
            status:1,
            data: order, 
            msg:"Order data deleted successfuly"
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

//-------------- get one order by customer ------------------------
router.get('/order/:id',auth,async (req,res)=>{

    try{
        const _id = req.params.id
        const data = await Order.findById(_id)
        if(!data){
            res.status(200).send({
                status:2,
                data: data,
                msg:"not found"
            })
        }
        res.status(200).send({
            status:1,
            data: data,
            msg:"order found"
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

//-------------- get one order by admin ------------------------
router.get('/orderAdmin/:id',auth,async (req,res)=>{

    try{
        const _id = req.params.id
        const data = await Order.findById(_id)
        if(!data){
            res.status(200).send({
                status:2,
                data: data,
                msg:"not found"
            })
        }
        res.status(200).send({
            status:1,
            data: data,
            msg:"order found"
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



module.exports = router