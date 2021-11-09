const e = require('express')
const moment = require('moment ')
const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infraestrutura/conexao')

module.exports = Atendimento

class Atendimento{
    
    //metodo para adicionar os atendimentos
    adiciona(atendimento,res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimentos.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimentos.cliente.length >= 5

        const validacoes = [{
            nome: 'data',
            valido: dataEhValida,
            mensagem: 'data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: clienteEhValido,
            mensagem: 'Cliente deve ter pelo menos cinco caracteres'
        }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
        }else {
                                          //array
            const atendimentoDatado = {...atendimentos,dataCriacao,data}
             const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sq, atendimentoDatado, (erro,resultados) => {
            if(erro){
                    //statusHTTP
                res.status(400).json(erro)
            }else{
                res.status(201).json(atendimentos)
            }
          })
        }       
    }

    //metodo para listar todos os atendimentos
    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro,resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    //metodo para listar somente pelo ID selecionado
    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql,(erro,resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    //metodo para alterar os dados do atendimento
    altera(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql,[valores,id],(erro,resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    //metodo para  deletar o atendimento
    deleta(id,res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}