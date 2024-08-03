import express from 'express'
import { PORT, JWT_SECRET_key } from '../conf.js'
import { UserRepository } from './user_repo.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req,res, next)=>{
    console.log('PASA POR AQUI O Q TRANZA')
    const token = req.cookies.access_token
    req.session = { user: null}

    try{
        const data = jwt.verify(token, JWT_SECRET_key)
        req.session.user = data
    }catch{   }

    console.log('LLEGA A LA FUNCIÓN SIGUIENTE')
    next()
})

app.get('/api/', (req,res) => {
   
    const {user} = req.session
    // res.render('idex', data)
    

})

// Endpoint for login
app.post('/api/login', async (req,res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({username, password})
        const token = jwt.sign({id: user._id, username: user.username},
            JWT_SECRET_key,{ expiresIn:'1h' })
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
            maxAge: 1000*60*60
        }).send({ user,token })
    } catch(error) {
        res.status(401).send(error)
    }
})

// Endpoint for register
app.post('/register',async (req,res) => {
    const {username, password} = req.body

    try{
        const id = await UserRepository.create({username, password})
        res.send({ id })
    } catch (error){
        res.status(400).send(error)
    }
})

// Endpoint for logout
app.post('/logout', (req,res) => {
    res
        .clearCookie('access_token')
        
})

app.post('/protected', (req,res) => {
    const {user} = req.session
    if(!user) return res.status(403).send('Acces not authorized')
    //res.render('protected', user)
})

app.get('/test', (req, res) => res.json({message: 'Hello World'}))


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

