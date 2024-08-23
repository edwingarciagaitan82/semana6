const fs = require('fs')
const zlib = require('zlib')
const categoriaModel = require('../models/categorySchema')
const { validationResult } = require('express-validator')




const categoriasListar = async(req,res) =>{
    const categorias = await tecnologieModel.find()
    console.log(categorias)
    res.status(200).json( {data : categorias})
}

const categoriasGuardar = async(req,res)=>{
    const errores = validationResult(req)
    if(!errores.isEmpty)
        res.status(401).json({ errores: errores.array() })

    try{
        const objeto = new categoriaModel(req.body)
        objeto.save()
        res.status(200).json({ "message" : "categoria Guardada" })
    }catch(err){
        res.status(400).json("error", err)    
    }

}

const categoriaEliminar = async (req,res) =>{
    try{
        const id = req.params.id
        const rta = await categoriaModel.deleteOne({ _id : id })
        res.status(200).json({ "message" : "Dato Eliminado con Exito" })
    }catch(err){
        res.status(400).json("error", err)   
    }
} 

module.exports = { 
    categoriasListar,
    categoriasGuardar,
    categoriaEliminar
 }