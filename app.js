const express = require('express')
const mongoose = require('mongoose')

// Routes files
const blogs = require('./routes/blogs')

// Express app
const app = express()

// Connect to MongoDB & listen for requests
const db_url = 'mongodb://localhost:27017/node-crash-course'

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(3000))
.catch(error => console.log(error))

// Register view engine
app.set('view engine', 'ejs')

// Middlewares & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca' })
})

app.use('/blogs', blogs)

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' })
})