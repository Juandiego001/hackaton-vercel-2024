
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { db } from '../conf.js'
// Configurar el cliente de Turso


// Crear tabla de usuarios si no existe
await db.execute(`
    CREATE TABLE IF NOT EXISTS User (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);

export class UserRepository {
    static async create({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        // Verificar si el usuario ya existe
        const user = await db.execute({
            sql: 'SELECT * FROM User WHERE username = ?',
            args: [username]
        });

        if (user.rows.length > 0) throw new Error('username already exists');

        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        await db.execute({
            sql: 'INSERT INTO User (id, username, password) VALUES (?, ?, ?)',
            args: [id, username, hashedPassword]
        });

        return id;
    }

    static async login({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        // Buscar usuario en la base de datos
        const userResult = await db.execute({
            sql: 'SELECT * FROM User WHERE username = ?',
            args: [username]
        });

        if (userResult.rows.length === 0) throw new Error('username does not exist');

        const user = userResult.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('password is invalid');

        return {
            username: user.username,
        };
    }
}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('username must be at least 3 characters long');
    }

    static password(password) {
        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password must be at least 4 characters long');
    }
}


