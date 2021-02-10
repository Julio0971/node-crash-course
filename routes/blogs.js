const express = require('express')
const blog_controller = require('../controllers/blog-controller')
const router = express.Router()

router.get('/', blog_controller.index)
router.get('/create', blog_controller.create)
router.get('/:id', blog_controller.show)
router.post('/', blog_controller.store)
router.delete('/:id', blog_controller.destroy)

module.exports = router