const mongoose = require('mongoose')
const Product = require('./models/Product')

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("Connected to Mongoose");
})
.catch(err=>{
    console.log('Not connected to mongoose');
    console.log(err);
})

Product.deleteMany({})
.then(()=>console.log("deleted"))
.catch(err=>console.log(err))

seedProducts = [{
    name: "Mango",
    price: 100,
    pricePer:'kg',
    category:"fruit",
    quantity:20
},
{
    name: "Banana",
    price: 60,
    pricePer:'dozen',
    category:"fruit",
    quantity:40
},
{
    name: "Kiwi",
    price: 40,
    pricePer:'piece',
    category:"fruit",
    quantity:60
},
{
    name: "Milk",
    price: 60,
    pricePer:'kg',
    category:"diary",
    quantity:70
},
{
    name: "Paneer",
    price: 240,
    pricePer:'kg',
    category:"diary",
    quantity:10
},
{
    name: "Patato",
    price: 10,
    pricePer:'kg',
    category:"vegetable",
    quantity:200
},
{
    name: "Tamato",
    price: 40,
    pricePer:'kg',
    category:"vegetable",
    quantity:100
}]

Product.insertMany(seedProducts)