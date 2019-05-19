//import dotenv to use .env file
require('dotenv').config()

//import express
const express =  require('express')
const app = express()

//import mongoose
const mongoose = require('mongoose')

//connect to db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database Connected Successfully!'))

//setup server to use json 
app.use(express.json())

//setup routes
const usersRoute = require('./routes/users')
//initialise route
app.use('/users', usersRoute)


//start server 
app.listen(4000, () => console.log('Server Started..'))