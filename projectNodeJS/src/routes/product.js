const Product = require('../models/product')
const express = require('express')
const authAdmin = require('../middleware/adminAuthor')
const multer = require('multer')
const path = require("path");
const router = new express.Router()

//-------------- add product ------------------------
router.post('/addProduct',authAdmin,async (req,res)=>{

    try{
        const data = new Product(req.body)
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg:"data inserted"
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

//-------------- get all products ------------------------
router.get('/allProducts',async (req,res)=>{

    try{
        const data = await Product.find({})
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

//-------------- edit product ------------------------
router.patch('/product/:id',authAdmin, async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["name","quantity","category","price"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(200).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const product = await Product.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!product){
            res.status(400).send({
                status:2,
                data:"",
                msg:"product not found"
            })
        }
        res.status(200).send({
            status:1,
            data: product, 
            msg:"product data updated successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data"
        })
    }
})

//-------------- delete product ------------------------
router.delete('/product/:id',authAdmin, async(req,res)=>{
    const _id= req.params.id
    try{
        const product = await Product.findByIdAndDelete(_id)
        if(!product){
            res.status(200).send({
                status:2,
                data:"",
                msg:"product not found"
            })
        }
        res.status(200).send({
            status:1,
            data: product, 
            msg:"product deleted successfuly"
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

//-------------- get one product ------------------------
router.get('/product/:id',async (req,res)=>{

    try{
        const _id = req.params.id
        const data = await Product.findById(_id)
        if(!data){
            res.status(400).send({
                status:2,
                data: data,
                msg:"not found"
            })
        }
        res.status(200).send({
            status:1,
            data: data,
            msg:"task found"
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

//-------------- get all products by category ------------------------
router.post('/allProductCat',async (req,res)=>{
    const cat = req.body.category;
    try{
        const data = await Product.find({ "category": cat })
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

//------------------upload img----------------------
let uniqueSuffix
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
    uniqueSuffix = Date.now() + file.originalname.match(/\.(jpg|png|PNG|JPG)$/)[0]
      cb(null, uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })    
router.post('/product/:id/uploadImg',authAdmin, upload.single('upload'), async(req,res)=>{

    try{
        const _id = req.params.id
        const data = await Product.findById(_id)
        if(!data){
            res.status(400).send({
                status:2,
                data: data,
                msg:"not found"
            })
        }
        data['image']= `images/${uniqueSuffix}`
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg:"task found"
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

router.get("/:imgname", (req, res) => {
    const _id = req.params.imgname
    res.sendFile(path.join(__dirname, "../../images/"+_id));
  });

module.exports = router

