const express = require('express')
const router = express.Router()
const usuario = require('../controllers/usuarioCtrl')
const { check } = require('express-validator')

// router.post("/login", experiencia.experienciaGuardar )
router.post("/register", usuario.usuarioSave )


module.exports = router