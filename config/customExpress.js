//Configurar o Express

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
    
module.exports = () =>{
    const app = express()
            //passando o formato dos dados
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    consign()
    .include('controllers')
    .into(app)

    return app
}

