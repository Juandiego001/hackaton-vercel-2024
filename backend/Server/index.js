import express from 'express'
import cors from 'cors'
import fs from 'fs'
import logger from 'morgan'
import dotenv from 'dotenv'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import {createClient} from '@libsql/client'

import { Server } from 'socket.io' //websocket
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})


const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  throw new Error('Google Generative AI API key is missing.');
}

// Función para generar la respuesta de la IA
async function ia(msg) {
  const messages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Como un experto en diseño UX y UI revisa que errores tiene la pagina web, empieza con un resumen de forma general con un maximo de dos parrafos, luego especifica los errores agrupado por componentes (boton,titulo,parrafos) que presenta el error. El texto no debe tener ningun tipo de estilo.' },
        { type: 'image', image: new URL(msg) }
      ]
    }
  ];

  const model = google('models/gemini-1.5-flash-latest', { apiKey });

  // Llamar al modelo de lenguaje con el mensaje del usuario
  const result = await generateText({
    model,
    messages,
    maxTokens: 4096,
    temperature: 0.3,
    topP: 0.4,
  });

  return result.text;
}


const db = createClient({
    url : "libsql://eager-feral-diegoaarturo.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT)`)

io.on('connection', async (socket)=>{
    console.log('a user has connected')

    socket.on('disconnect',()=>{
        console.log('an user has disconnected')
    })

    socket.on('chat message',async(msg)=>{
        let result
        const username = socket.handshake.auth.username ?? 'anonymous'
        try {
            
            result = await db.execute({
                sql:'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: {msg, username}

            });
            const iaResponse = await ia(msg);

            console.log('IA RESPONSE: ')
            console.log(iaResponse);

            io.emit('chat message', iaResponse, result.lastInsertRowid.toString(), username);
            //io.emit('ia response', iaResponse, username);

        } catch (e){
            console.error(e)
            return

        }
        
        
        //console.log('message: '+msg)
    })

    if (!socket.recovered){
        try {
            const results = await db.execute({
            sql:'SELECT id, content, user FROM messages WHERE id > ?',
            args:[socket.handshake.auth.serverOffset ?? 0]
        })

        results.rows.forEach(row=>{
            socket.emit('chat message', row.content, row.id.toString(), row.user)
        })
    } catch(e){
        console.error(e)
    }
    }
})

app.use(cors())
app.use(logger('dev')) // retorna codigos de accion

app.get('/', (req, res ) =>{
    res.sendFile(process.cwd() + '/client/index.html')
})

app.post('/img', (req, res) => {
    console.log(req);
    const img = req.object;
    console.log('IMG: ' )
    console.log(img)
    

    res.json({'message': 'Uploaded image successfully'})
})

server.listen(port,()=>{
    console.log(`server running on port ${port}`)
})