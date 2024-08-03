// import express from 'express';
// import cors from 'cors';
// import fs from 'fs';
// import logger from 'morgan';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import { generateText } from 'ai';
// import { google } from '@ai-sdk/google';
// import { createClient } from '@libsql/client';
// import { createServer } from 'node:http';

// dotenv.config();

// const port = process.env.PORT ?? 3000;

// const app = express();
// const server = createServer(app);
// const upload = multer({ dest: 'uploads/' });

// const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
// if (!apiKey) {
//   throw new Error('Google Generative AI API key is missing.');
// }

// // Función para generar la respuesta de la IA
// async function ia(msg, imgPath) {
//   const messages = [
//     {
//       role: 'user',
//       content: [
//         { type: 'text', text: 'Como un experto en diseño UX y UI revisa que errores tiene la pagina web, empieza con un resumen de forma general con un maximo de dos parrafos, luego especifica los errores agrupado por componentes (boton,titulo,parrafos) que presenta el error. El texto no debe tener ningun tipo de estilo.' },
//         imgPath ? { type: 'image', image: fs.readFileSync(imgPath).toString('base64') } : { type: 'text', text: msg }
//       ]
//     }
//   ];

//   const model = google('models/gemini-1.5-flash-latest', { apiKey });

//   const result = await generateText({
//     model,
//     messages,
//     maxTokens: 4096,
//     temperature: 0.4,
//     topP: 0.4,
//   });

//   return result.text;
// }

// // Configurar el cliente de Turso
// const db = createClient({
//   url: "libsql://eager-feral-diegoaarturo.turso.io",
//   authToken: process.env.DB_TOKEN
// });

// // Crear tabla de mensajes si no existe
// await db.execute(`
//   CREATE TABLE IF NOT EXISTS messages (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     content TEXT,
//     user TEXT
//   )
// `);

// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json()); // Para manejar JSON en los cuerpos de las solicitudes

// app.get('/', (req, res) => {
//   res.sendFile(process.cwd() + '/client/index.html');
// });

// // Ruta para manejar mensajes de texto
// app.post('/message', async (req, res) => {
//   const { msg, username = 'anonymous' } = req.body;
//   try {
//     const iaResponse = await ia(msg);

//     const result = await db.execute({
//       sql: 'INSERT INTO messages (content, user) VALUES (?, ?)',
//       args: [msg, username]
//     });

//     const messageId = result.lastInsertRowid.toString(); // Convertir BigInt a string

//     res.json({ message: 'Message processed successfully', iaResponse, messageId });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Error processing message' });
//   }
// });

// // Ruta para manejar imágenes
// app.post('/img', upload.single('image'), async (req, res) => {
//   const imgPath = req.file.path;
//   try {
//     const iaResponse = await ia(null, imgPath);

//     res.json({ message: 'Uploaded image successfully', iaResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error processing image' });
//   } finally {
//     fs.unlink(imgPath, (err) => {
//       if (err) console.error('Failed to delete image:', err);
//     });
//   }
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import initializeServer from './chat.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ?? 4000;
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); // Para manejar JSON en los cuerpos de las solicitudes

initializeServer(app).catch(err => {
    console.error("Failed to initialize server:", err);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});