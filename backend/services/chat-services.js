import ExcelJS from 'exceljs'; 
import path from 'path'; 
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, '../../data/demanda.xlsx')

const COLUNAS = [ 
    'ID', 'Titulo', 'Solicitante', 'Email', 'Tipo', 'Descricao', 'Prioridade', 'Status', 'DataAbertura', 'TimeResponsavel'
]

async function garantirArquivos(workbook) { 
    try{ 
        await workbook.xlsx.readFile(filePath)
    }catch{ 
        const sheet = workbook.addWorksheet('Demandas'); 
        sheet.addRow(COLUNAS)
        await workbook.xlsx.writeFile(filePath)
    }
}

async function salvarDemandas(dados){ 
    const workbook = new ExcelJS.Workbook() 
    await garantirArquivos(workbook) 

    const sheet = workbook.getWorksheet('Demandas'); 
    const ultimaLinha = sheet.lastRow?.number || 1; 
    const novoId = ultimaLinha  // linha 1 = cabeçalho, então ID = numero da Linha 

    sheet.addRow([ 
        novoId,
        dados.titulo,
        dados.solicitante,
        dados.email,
        dados.tipo,
        dados.descricao,
        dados.prioridade || 'Média', 'Aberto', 
        new Date().toLocaleDateString('pt-BR'), 
        dados.time || 'A definir'
    ])
    await workbook.xlsx.writeFile(filePath)
    return novoId
}

async function listarDemandas(){ 
    const workbook = new ExcelJS.Workbook() 
    await garantirArquivos(workbook)

    const sheet = workbook.getWorksheet('Demandas'); 
    const demandas = [] 

    sheet.eachRow((row, rowNumber) => { 
        if(rowNumber === 1 ) return //pula cabeçalho 
        const valores = row.values.slice(1) //excel comça com indice 1 
        const obj = {}
        COLUNAS.forEach((col, i) => obj[col] = valores[i]) 
        demandas.push(obj)
    })
    return demandas
}

export { salvarDemandas, listarDemandas } 