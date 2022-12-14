// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000")
})

// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)
// rota inicial / endpoint
app.get('/', (req, res) => {

    //mostar req

    res.json({ message: 'Oi Express!' })

})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dbu0bpy.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB!')
        app.listen(8080)

    })
    .catch((err) => console.log(err))