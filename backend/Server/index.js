import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import initializeServer from './chat.js';
import Count from './count.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config();

const port = process.env.PORT ?? 5000;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json()); // Para manejar JSON en los cuerpos de las solicitudes
app.use(cookieParser());

// Inicializar las funciones con manejo de errores
async function startServer() {
    try {
        await initializeServer(app);
        await Count(app);
    } catch (err) {
        console.error('Failed to initialize server:', err);
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();