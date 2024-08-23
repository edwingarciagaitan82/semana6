const express = require('express')
const router = express.Router()
const categorias = require('../controllers/categoriesCtrl') 
const { check } = require('express-validator')

const { Console } = require('console')

router.get("/", //(req,res)=>{  res.send("base")  }
    categorias.categoriasListar
    // res.send(categorias.categoriasListar())
//}
)

router.get("/:id/:nombre", (req,res)=>{    }
    //categorias.categoriasObtener
)

router.post("/", 
        [
            check("nombre", "Nombre Obligatorio").not().isEmpty(),
            check("nombre", "longitud de nombre No Valida").isLength({min:4 , max: 25 })
        ],
        // (req,res) => res.send("post")
        categorias.categoriasGuardar
)

router.delete("/:id",
        categorias.categoriaEliminar
)

module.exports = router 