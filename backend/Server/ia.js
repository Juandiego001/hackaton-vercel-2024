import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import dotenv from 'dotenv';
import { streamText } from 'ai';
import * as readline from 'node:readline/promises';




dotenv.config();

// var url = readLine('url pagina web:') // Entrada de texto por consola

async function main() {

  
  const messages = [
    { role: 'user', content: [{ type: 'text',text:'Como un experto en diseño UX y UI revisa que errores tiene la pagina web, empieza con un resumen de forma general con un maximo de dos parrafos, luego especifica los errores agrupado por componentes (boton,titulo,parrafos) que presenta el error'},
      {type: 'image', image: new URL(userInput)}] }

  ];
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('Google Generative AI API key is missing.');
  }

  // Get a language model
  const model = google('models/gemini-1.5-flash-latest', { apiKey })

  // Call the language model with the prompt
  const result = await  generateText({
    model,
    messages,
    maxTokens: 4096,
    temperature: 0.3,
    topP: 0.4,
  })
  

  console.log(result.text);
}

