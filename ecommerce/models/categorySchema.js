const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        nombre : { 
            type : String,
            require : true,
            trim : true
        },
        icono : {
            type: String,
            require : true,
            trim : true
        }

    }
)   
module.exports = mongoose.model("category", categorySchema )