

const express=require('express');
require('dotenv').config();

const db= require('./db/connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator=require('express-validator')

const CategoryRoute=require('./route/categoryRoute')
const ProductRoute=require('./route/productRoute')
const UserRoute = require('./route/userRoute')
const orderRoute = require('./route/orderRoute')
const cookieParser =require('cookie-parser')

const app=express()

//middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(expressValidator())
app.use(cookieParser())


//Route

app.use('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',UserRoute)
app.use('/api',orderRoute)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
