const router = require('express').Router()

const Controller = require('../controllers/userController')

router.get('/register', Controller.registerForm)

module.exports = router