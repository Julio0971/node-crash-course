const Blog = require('../models/blog')

const index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(blogs => {
        res.render('blogs/index', { title: 'Blogs', blogs })
    })
    .catch(error => {
        console.log(error)
    })
}

const create = (req, res) => {
    res.render('blogs/create', { title: 'Crear un blog' })
}

const show = (req, res) => {
    Blog.findById(req.params.id).then(blog => {
        res.render('blogs/show', { title: blog.title, blog })
    })
    .catch(error => {
        res.status(404).render('404', { title: 'Página no encontrada' })
    })
}

const store = (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.redirect('/')
    })
    .catch(error => {
        console.log(error)
    })
}

const destroy = (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(blog => {
        res.json({
            redirect: '/'
        })
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    index,
    create,
    show,
    store,
    destroy
}