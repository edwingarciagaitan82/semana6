const express = require('express')
const router = express.Router()
const experiencia = require('../controllers/experienciasCtrl') 
const { check } = require('express-validator')
const auth = require('../security/auth')

router.get("/", auth, experiencia.experienciasListado )
router.post("/", experiencia.experienciaGuardar )
router.post("/", experiencia.experienciaGuardar )
router.put("/", [
                check("nombre", "Registra un nombre Valido").not().isEmpty()
            ],
            experiencia.experienciaActualizar )

router.delete("/:id" ,
        experiencia.experienciaEliminar
 )

module.exports = router