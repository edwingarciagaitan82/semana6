const http = require('http')
const experienciaModel = require('../models/experienceSchema')
const { validationResult } = require('express-validator')
const validar = (req,res) =>{
     //validar token
     var options = {
        host: 'http://localhost:3001',
        path: '/validar'
      };
      var req = http.get(options, function(res) {
        res.on(data, function(chunk) {
            console.log(data)
            
          })
    })
}

const experienciasListado = (req,res) =>{

    //1. validar el token
    //peticion servidor 3001.   /http://localhost:3001/api/tokens/validar

    //1. obtener las experiencias
    //peticion servidor 3002 

    res.status(200).json({ message : "listado" })
}


const experienciaGuardar = (req,res) =>{
    console.log(req.body)
   
    try{
        const objeto = new experienciaModel(req.body)
        objeto.save()
        res.status(200).json("ok")
    }catch(err){
        res.status(400).json("error", err)    
    }
        
}

const experienciaActualizar = async (req,res) =>{
    try{
        const { id, nombre, logros, desde, hasta } = req.body
        const errores = validationResult(req)
        if(!errores.isEmpty)
            res.status(401).json({ errores: errores.array() })

        const objeto = {}
        objeto.nombre = nombre
        objeto.logros = logros
        objeto.desde = desde
        objeto.hasta = hasta
        console.log(id,objeto)
        const rta = await experienciaModel.updateOne(
            { _id : id },
            { $set : objeto },
            { new : true }
        )
        console.log(rta)
        res.status(200).json({ message: "Dato Acutalizado" })
    }catch(err){
        res.status(400).json({"error": err })
    }

}

const experienciaEliminar = async (req,res) =>{
    try{
        const id = req.params.id
        const rta = await experienciaModel.deleteOne({ _id : id })
        res.status(200).json({ "message" : "Dato Eliminado con Exito" })
    }catch(err){
        res.status(400).json("error", err)   
    }
} 
module.exports = {
    experienciaGuardar,
    experienciaActualizar,
    experienciaEliminar,
    experienciasListado
}