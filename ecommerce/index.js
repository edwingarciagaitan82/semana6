const express = require('express')
const app = express()
const puerto = 3002
const db = require('./config/db')
app.use(express.json())
app.use("/api/categorias",require('./routes/categoryRoute'))
app.use("/api/productos", require('./routes/productoRoute'))
app.use("/api/usuarios",require('./routes/userRoute'))

app.listen(puerto, ()=>{ console.log("Servidor Express Ecommerce Activo, puerto:", puerto) })
db()