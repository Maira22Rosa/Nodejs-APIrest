module.exports = conexao


//importando Mysql
const mysql = require('mysql')
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'agendaPetshop'
})

