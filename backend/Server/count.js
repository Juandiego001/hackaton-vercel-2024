import { JWT_SECRET_key } from '../conf.js'
import { UserRepository } from './user_repo.js'
import jwt from 'jsonwebtoken'

export default async function Count(app) {
    app.use((req, _, next) => {
        const token = req.cookies.access_token;
        req.session = { user: null };

        try {
            const data = jwt.verify(token, JWT_SECRET_key);
            req.session.user = data;
        } catch {}

        next();
    });

    // Endpoint for login
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await UserRepository.login({ username, password });
            const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_key, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }).send({ user, token });
        } catch (error) {
            res.status(401).send(error);
        }
    });

    // Endpoint for register
    app.post('/api/register', async (req, res) => {
        const { username, password } = req.body;
        try {
            const id = await UserRepository.create({ username, password });
            res.send({ id });
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // Endpoint for logout
    app.post('/api/logout', (req, res) => {
        res.clearCookie('access_token');
    });
}
