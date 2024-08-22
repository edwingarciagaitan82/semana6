const express = require('express')
const app = express()
const puerto = 3000
const db = require('./config/db')
app.use(express.json())
app.use("/api/experiencias", require('./routes/experienciasRoute'))
app.use("/api/tecnologies",require('./routes/tecnologiasRoute'))


app.listen(puerto, ()=>{ console.log("Servidor Express Portfolio Activo, puerto:", puerto) })
db()