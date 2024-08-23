const express = require('express')
const app = express()
const puerto = 3000
const db = require('./config/db')
const axios = require('axios')
app.use(express.json())

const tokenVerificar = async (req,res,next) =>{
    const token = req.headers['authorization']
    const response  = {}
    if(!token)
        return res.status(403).json({ message : "Token No  existe "})
    try{
        //verificar si ese token es valido
        const url = `http://localhost:3001/api/tokens/validar`
        await axios.post(url, { headers : { 'Authorization' : token } } )
        //console.log(response)
        next()
    }catch(err){
        return res.status(401).json({ message : "No Autorizado" })
    }
}

app.use("/:entity" , tokenVerificar, async (req,res) =>{
        const entity = req.params.entity
        const method = req.method.toLocaleLowerCase()   //POST Post  => post
        const url = `http://localhost:3002/api/${entity}`
        let response = {} 
        if( method == "get"){ console.log("get request")
            console.log("url",url)
            response = await axios.get(url)
        }
        res.status(200).json(response.data)
    }
 )
app.listen(puerto, ()=>{ console.log("Servidor Express Portfolio Activo, puerto:", puerto) })
db()