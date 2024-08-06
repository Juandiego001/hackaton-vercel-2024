import fs from 'fs';
import multer from 'multer';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export default async function initializeServer(app) {
    const upload = multer({ dest: 'uploads/' });

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error('Google Generative AI API key is missing.');
    }

    // Función para generar la respuesta de la IA
    async function ia(msg, imgPath) {
        const messages = [
            {
                role: 'user',
                content: [
                    { type: 'text', text: 'Como un experto en diseño UX y UI revisa que errores tiene la pagina web, empieza con un resumen de forma general con un maximo de dos parrafos, luego especifica los errores agrupado por componentes (boton,titulo,parrafos) que presenta el error. El texto no debe tener ningun tipo de estilo.' },
                    imgPath ? { type: 'image', image: fs.readFileSync(imgPath).toString('base64') } : { type: 'text', text: msg }
                ]
            }
        ];

        const model = google('models/gemini-1.5-flash-latest', { apiKey });
        const result = await generateText({
            model,
            messages,
            maxTokens: 4096,
            temperature: 0.4,
            topP: 0.4,
        });

        return result.text;
    }

    // Ruta para manejar mensajes de texto
    app.post('/api/link', async (req, res) => {
        const { link } = req.body;
        try {
            const iaResponse = await ia(link);
            res.json({ message: 'Message processed successfully', iaResponse});
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Error processing message' });
        }
    });

    // Ruta para manejar imágenes
    app.post('/api/img', upload.single('image'), async (req, res) => {
        const imgPath = req.file.path;
        try {
            const iaResponse = await ia(null, imgPath);
            res.json({ message: 'Uploaded image successfully', iaResponse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error processing image' });
        } finally {
            fs.unlink(imgPath, (err) => {
                if (err) console.error('Failed to delete image:', err);
            });
        }
    });
}
