import dotenv from 'dotenv'
import { createClient } from '@libsql/client';

dotenv.config()

export const {
    PORT = 5000,
    JWT_SECRET_key = 'super-mega-llav3-63-40x3l-spQ9t-4k80-questa-is-100lior'
} = process.env

export const db = createClient({
    url : "libsql://eager-feral-diegoaarturo.turso.io",
    authToken: process.env.DB_TOKEN
})