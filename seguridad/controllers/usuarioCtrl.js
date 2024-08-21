const usuarioModel = require('../models/usuarioSchema')
const bcrypt = require('bcryptjs')

const usuarioSave = async( req,res)=>{
    const { correo, contrasena, nombre } = req.body
    let contrasenaEncrypt;

    //validacion de correo, contraseña y nombre


    //generar una contraseña encriptada
    const salt = 10;
    bcrypt.hash(contrasena, salt, (err, hash) => {
        if (err) {
            return;
        }
        console.log('Hashed password:', hash);
        try{
            const objeto = new usuarioModel({ nombre: nombre, correo : correo, contrasena : hash  })
            objeto.save()
            res.status(200).json("ok")
        }catch(err){
            res.status(400).json("error", err)    
        }
    })
} 

module.exports = {
    usuarioSave
}