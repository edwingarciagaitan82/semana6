const express = require('express')
const app = express()
const puerto = 3002
const db = require('./config/db')
app.use(express.json())
app.use("/api/tecnologias",require('./routes/tecnologias'))
app.use("/api/experiencias", require('./routes/experiencias'))

app.listen(puerto, ()=>{ console.log("Servidor Express Entidades Activo, puerto:", puerto) })
db()