const express = require('express')

// Express app
const app = express()

// Register view engine
app.set('view engine', 'ejs')

// Listen for requests
app.listen(3000)

app.get('/', (req, res) => {
    const blogs = [
        {
            title: 'Blog 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper massa eget felis cursus mollis. Aliquam convallis egestas tincidunt.'
        },
        {
            title: 'Blog 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper massa eget felis cursus mollis. Aliquam convallis egestas tincidunt.'
        },
        {
            title: 'Blog 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper massa eget felis cursus mollis. Aliquam convallis egestas tincidunt.'
        }
    ]

    res.render('index', { title: 'Inicio', blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Crear un blog' })
})

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' })
})