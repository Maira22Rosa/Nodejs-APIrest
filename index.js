const express = require('express')
const app = express()
       //porta    //chamando uma função  
app.listen(3000, () => console.log('servidor rodando na porta 3000'))

//criando rota
//*req = requisição-recebendo * res=devolvendo
app.get('/atendimentos',(req,res) => res.send('Tudo OK'))