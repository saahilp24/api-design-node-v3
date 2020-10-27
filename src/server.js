//middleware - list of fuctins that run before a controller 
// REST routes allows you to match routes in different ways (exact matching vs parameters)
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

//this is middleware
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

//middleware
const log = (req, res, next) => {
    console.log('logging')
    next()
}

router.get('/me', (req, res) => {
    res.send({me: 'hello'})
})

const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id']

app.use('/api', router)

//this is a route, the last arguement is a controller (function)
//CRUD create read put destory
app.get('/data', log , (req, res) => {
    res.send({data: [1, 2, 3]})
})

//PUT changes data 
app.put('/data' , (req, res) => {

})

//Delete
// app.delete()

//this is a route, posting data to the server, creating something new 
app.post('/data', (req, res) => {
    console.log(req.body)
    res.send({ok: true})
})

export const start = () => {
    app.listen(3000, () => {
        //running as debug to make sure server is set up
        console.log('server is on 3000') 
    })
}
