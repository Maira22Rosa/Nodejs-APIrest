const Atendimento = require('../models/atendimentos')

//criando o modulo para exportar o app
module.exports = app => {
    //criando rota
//*req = requisição-recebendo * res=devolvendo
app.get('/atendimentos',(res) => {
    Atendimento.lista(res)
})

//Get por Id
app.get('/atendimentos/:id',(req,res) =>{
    const id = parseInt(req.params.id)

    Atendimento.buscaPorId(id, res)
})

app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    atendimento.adiciona(atendimento,res)    
})
app.patch('/atendimentos/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    Atendimento.altera(id,valores,res)
})  

app.delete('/atendimentos/:id',(req, res)=> {
    const id = parseInt(req.params.id)

    Atendimento.deleta(id,res)
})

}

