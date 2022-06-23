const router = require('express').Router()

const Controller = require('../controllers/userController')

router.get('/register', Controller.registerForm)
router.post('/register', Controller.addNewUser)

router.get('/signin', Controller.formSignIn)
router.post('/signin', Controller.userSignIn)

module.exports = router