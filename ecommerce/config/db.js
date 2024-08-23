const mongoose = require('mongoose')
// const URIDB = "mongodb+srv://edwingarcia2022:12345@cluster0.d9a6c.mongodb.net/portfolio?retryWrites=true&w=majority";
const URIDB = "mongodb://127.0.0.1:27017/ecommerce";
const connectDB = async() =>{
    try{
        await mongoose.connect(URIDB)
        console.log("conexion satisfactoria")
    }catch(err){
        console.log("Error de Conexion", err)
    }
}

module.exports = connectDB 