const express = require('express')
const router = express.Router()
const producto = require('../controllers/productsCtrl') 
const { check } = require('express-validator')
const multer = require('multer')
router.get("/:page",producto.productosListado)
router.post("/", producto.productoGuardar )
router.put("/", [
                check("nombre", "Registra un nombre Valido").not().isEmpty()
            ],
            producto.productoActualizar )

router.delete("/:id" ,
        producto.productoEliminar
 )

const upload = multer({ dest: 'public/images/' })

router.put("/imagen/:id", 
                upload.single('imagen'), 
                producto.productoImagen
 )

const uploadVideo = multer({ dest: 'public/videos/' })
router.put("/video/:id",
    uploadVideo.single('video'),
    producto.productoVideo
)

module.exports = router