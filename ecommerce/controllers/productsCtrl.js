const http = require('http')
const productoModel = require('../models/productSchema')
const { validationResult } = require('express-validator')

const productosListado = async (req,res) =>{
    let pagina = 1
    if(req.params.page)
        pagina = req.params.page
    console.log("pagina", pagina)
    const lote = 4
    const posicion =  (pagina - 1) * lote
    //  pagina  1  - 1    lote 4     posicion  0
    //  pagina 2  -1    lota 4     posicion   4
    const productos = await productoModel.find().skip(posicion).limit(lote)
    res.status(200).json({ data : productos })
}


const productoGuardar = (req,res) =>{
    console.log(req.body)
    try{
        const objeto = new productoModel(req.body)
        objeto.save()
        res.status(200).json( {message :"ok"})
    }catch(err){
        res.status(400).json( {"error" : err })    
    }
        
}

const productoActualizar = async (req,res) =>{
    try{
        // const { id, nombre, descripcion, desde, hasta } = req.body
        const errores = validationResult(req)
        if(!errores.isEmpty)
            res.status(401).json({ errores: errores.array() })

        // const objeto = {}
        const objeto = req.body    
        console.log(id,objeto)
        const rta = await productoModel.updateOne(
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

const productoEliminar = async (req,res) =>{
    try{
        const id = req.params.id
        const rta = await productoModel.deleteOne({ _id : id })
        res.status(200).json({ "message" : "Dato Eliminado con Exito" })
    }catch(err){
        res.status(400).json("error", err)   
    }
} 

const productoImagen = async(req,res) =>{
    console.log("recibiendo imagen")
    const image = req.file
    console.log(image.mimetype)
    console.log("subiedo archivo", image.filename)
    const id = req.params.id
    fs.rename('./public/images/' + image.filename, './public/images/' + "categoria" +  id + ".jpg", ()=>{ console.log("Imagen cargada") } )
    res.status(200).json({ message: "image cargada correctamente"})
}


const productoVideo = async(req,res)=>{
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


module.exports = {
    productoGuardar,
    productoActualizar,
    productoEliminar,
    productosListado,
    productoImagen,
    productoVideo
}