const express = require('express')
const mongoose = require('mongoose')

// Express app
const app = express()

// Models
const Blog = require('./models/blog')

// Connect to MongoDB & listen for requests
const db_url = 'mongodb://localhost:27017/node-crash-course'

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => app.listen(3000))
.catch(error => console.log(error))

// Register view engine
app.set('view engine', 'ejs')

// Middlewares & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Routes
// Home
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

// About
app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca' })
})

// Get all blogs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(blogs => {
        res.render('blogs/index', { title: 'Blogs', blogs })
    })
    .catch(error => {
        console.log(error)
    })
})

// Create a blog
app.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: 'Crear un blog' })
})

// Stora a new blog
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.redirect('/blogs')
    })
    .catch(error => {
        console.log(error)
    })
})

// Show a blog
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id).then(blog => {
        res.render('blogs/show', { title: blog.title, blog })
    })
    .catch(error => {
        console.log(error)
    })
})

// Delete a blog
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(blog => {
        res.json({
            redirect: '/blogs'
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' })
})