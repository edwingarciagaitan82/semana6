const fs = require('fs')
const zlib = require('zlib')
const tecnologieModel = require('../models/tecnologiSchema')
const { validationResult } = require('express-validator')


const tecnologiaImagen = async(req,res) =>{
        console.log("recibiendo imagen")
        const image = req.file
        console.log(image.mimetype)
        console.log("subiedo archivo", image.filename)
        const id = req.params.id
        fs.rename('./public/images/' + image.filename, './public/images/' + "tecnologia" +  id + ".jpg", ()=>{ console.log("Imagen cargada") } )
        res.status(200).json({ message: "image cargada correctamente"})
}


const tecnologiaVideo = async(req,res)=>{
    console.log("recibiendo video")
    const video = req.file
    // console.log("subiendo video", video.filename)
    // fs.rename('./public/videos/'+ video.filename , './public/videos/video.mp4', ()=>{ console.log("video cargado") })
    const hashComprimido =  await new Promise((resolve,reject) =>{
        zlib.gzip(req.file.buffer , (err,buffer) =>{
            if(err) return reject(err)
            resolve(buffer) 
        })
    })  

    console.log("nuevohash", hashComprimido)
    const destinationFile = `public/videos/${req.file.originalname}.gz`;
    const destino = '../public/videos/videoComprimido.gz'
    const nuevoVideo = await fs.writeFile(destinationFile, hashComprimido,  
        (err, data)=> { 
            if(err){console.log("video comprimido")}  
            else console.log("video comprimido") } ) 
    // , ()=> { console.log("video comprimido") }
    res.send("video cargado")
}

const tecnologiasListar = async(req,res) =>{
    res.status(200).json({"message" : "En construccion"})
}

const tecnologiasGuardar = async(req,res)=>{
    const errores = validationResult(req)
    if(!errores.isEmpty)
        res.status(401).json({ errores: errores.array() })

    try{
        const objeto = new tecnologieModel(req.body)
        objeto.save()
        res.status(200).json({ "message" : "Tecnologia Guardada" })
    }catch(err){
        res.status(400).json("error", err)    
    }

}

const tecnologiaEliminar = async (req,res) =>{
    try{
        const id = req.params.id
        const rta = await tecnologieModel.deleteOne({ _id : id })
        res.status(200).json({ "message" : "Dato Eliminado con Exito" })
    }catch(err){
        res.status(400).json("error", err)   
    }
} 

module.exports = { 
    tecnologiaImagen,
    tecnologiaVideo,
    tecnologiasListar,
    tecnologiasGuardar,
    tecnologiaEliminar
 }