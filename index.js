if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Product = require('./models/Product')

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to Mongoose");
})
.catch(err=>{
    console.log('Not connected to mongoose');
    console.log(err);
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.redirect('/products')
})

const categories = ['fruit','vegetable','diary']
const pricePers = ['kg','piece','dozen']

app.get('/products',async(req,res)=>{
    const products = await Product.find({})
    res.render('all_products.ejs',{products,categories})
})

app.get('/products/add',(req,res)=>{
    res.render('add_product.ejs',{categories,pricePers})
})

app.post('/products/add',async(req,res)=>{
    await Product.insertMany([req.body])
    res.redirect('/products')
})

app.get('/product/:id',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('one_product.ejs',{product})
})

app.get('/products/:category',async(req,res)=>{
    const {category} = req.params
    const products = await Product.find({category})
    res.render('one_category.ejs',{products,category})
})

app.get('/product/:id/update',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('update_product.ejs',{product,categories,pricePers})
})

app.put('/product/:id/update',async(req,res)=>{
    const {id} = req.params
    await Product.findByIdAndUpdate(id,req.body)
    res.redirect(`/product/${id}`)
})

app.delete('/product/:id/delete',async(req,res)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.get('/bill/create',async(req,res)=>{
    const products = await Product.find({})
    res.render('create_bill.ejs',{products})
})

app.put('/bill/update',async(req,res)=>{
    // res.send(req.body)
    for (const key in req.body) {
        await Product.findByIdAndUpdate(key,{$set:{quantity:req.body[key]}})
    }
    res.redirect(`/products`)
})

app.get('/stock/insert',async(req,res)=>{
    const products = await Product.find({})
    res.render('stock.ejs',{products})
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})