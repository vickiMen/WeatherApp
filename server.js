// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require(`path`)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use( '/', api )


const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

// Mongoose setup
const mongoose = require('mongoose')
const DB_URL = `mongodb://localhost/Weather`

const connectionOptions = {
        // poolSize: 20,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        useNewUrlParser: true
}

mongoose.connect(DB_URL, connectionOptions, (err) => {
    if (err) {
        console.log(err.message)
    }
})