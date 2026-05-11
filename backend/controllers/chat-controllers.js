import { salvarDemandas } from '../services/chat-services.js'; 
import nodemailer from 'nodemailer'

async function criarDemanda(req, res) { 
    try{ 
        const dados = req.body 
        const id = await salvarDemandas(dados)

        res.status(201).json({sucesso: true, id, mensagem: 'Demanda registrada com sucesso!'})
    }catch(erro){ 
        console.error('Erro ao criar demanda: ', erro)
        res.status(500).json({sucesso:false, mensagem: 'Erro ao registrar demanda. '})
    }
}

export { criarDemanda }

