const mongoose = require('mongoose')

const experienceSchema = mongoose.Schema(
    {
        nombre : { 
            type : String,
            require : true,
            trim : true
        },
        logros : {
            type: Array,
        },
        desde : {
            type : Date,
        },
        hasta : {
            type : Date,
            require : true
        }

    }
)   
module.exports = mongoose.model("experiences", experienceSchema )