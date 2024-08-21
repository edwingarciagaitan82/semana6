const express = require('express')
const app = express()
const puerto = 3000
const db = require('./config/db')
app.use(express.json())
app.use("/api/usuarios",require('./routes/usuariosRoute'))

app.listen(puerto, ()=>{ console.log("Servidor Express Mongoose Activo, puerto:", puerto) })
db()