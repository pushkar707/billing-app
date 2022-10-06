const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','diary']
    },
    quantity:{
        type:Number,
        required: true,
        min:0
    },
    pricePer:{
        type:String,
        lowercase:true,
        enum:['kg','piece','dozen'],
        required:true
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product