import 'dotenv/config'
import app from './app.js' 

const PORT = process.env.PORT || 3002 

app.listen(3323, () => {  
   
    console.log(`Servidor rodando em htpp://localhost:3323`)
})



