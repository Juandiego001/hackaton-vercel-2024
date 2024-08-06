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