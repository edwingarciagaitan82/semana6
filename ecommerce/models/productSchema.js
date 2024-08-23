const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        nombre : { 
            type : String,
            require : true,
            trim : true
        },
        descripcion : {
            type : String,
            require : true,
            trim : true
        },
        imagen : {
            type : String,
            require : true,
            trim : true
        },
        imagenes : {
            type : Array
        },
        precio : {
            type : Number
        },
        categoria : {
            type : String,
        },
        estado : {
            type : Boolean
        }
    }
)   
module.exports = mongoose.model("product", productSchema )