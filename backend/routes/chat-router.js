import express from 'express'
const router = express.Router() 
import { criarDemanda } from '../controllers/chat-controllers.js'

router.post('/demanda', criarDemanda)

export default router 
