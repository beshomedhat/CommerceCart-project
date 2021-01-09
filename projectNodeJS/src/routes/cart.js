const Cart = require('../models/cart')
const express = require('express')
const auth = require('../middleware/author')
const router = new express.Router()

//-------------push in cart----------------------
router.post('/cart',auth,async (req,res)=>{
    const _id = req.data._id
    try{
        let data1 = await Cart.find({ "customerId": _id })
        let pData=[]
        if(data1.length>0){
            pData = data1[0]['productsData']
            await Cart.deleteOne({ "customerId": _id })
        }
        pData.push(req.body)
        const cartData = { customerId:_id, productsData:pData};
        const data = new Cart(cartData)
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg:"added to cart"
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

//-----------------get customer cart---------------------
router.post('/custCart',auth,async (req,res)=>{
    const _id = req.data._id
    try{
        const data = await Cart.find({ "customerId": _id })
        // if(!data || data.length==0){
        //     res.status(400).send({
        //         status:1,
        //         data: data,
        //         msg:"not Found"
        //     })
        // }
        res.status(200).send({
            status:1,
            data: data,
            msg:"cart"
        })
    }
    catch(e){
        res.status(500).send({
            status:1,
            data: "",
            msg:"err cart"
        })
    }
    
})
//----------------clear customer cart--------------
router.post('/clearCart',auth,async (req,res)=>{
    const _id = req.data._id
    try{
        const data1 = await Cart.deleteOne({ "customerId": _id })
        if(!data1){
            res.status(400).send({
                status:1,
                data: "",
                msg:"no cart"
            })
        }
        res.status(200).send({
            status:1,
            data: data1,
            msg:"cart cleared"
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

//----------remove item from cart-------------------
router.post('/cart/:id',auth,async (req,res)=>{
    const _id = req.data._id
    const _pId = req.params.id
    try{
        let data1 = await Cart.find({ "customerId": _id })
        let pData=[]
        if(data1.length>0){
            for(let i=0; i<data1[0]['productsData'].length; i++){
                if(data1[0]['productsData'][i]["_id"]==_pId){
                    data1[0]['productsData'].splice(i,1);
                    break;
                }
            }
            pData = data1[0]['productsData']
            await Cart.deleteOne({ "customerId": _id })
        }

        const cartData = { customerId:_id, productsData:pData};
         const data = new Cart(cartData)
         await data.save()
        res.status(200).send({
            status:1,
            data: cartData,
            msg:"added to cart"
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

