const router = require('express').Router()
const Controller= require('../controllers')

router.get('/', Controller.landingPage)

router.get('/home', Controller.showAllPost)

router.get('/profile/', Controller.profile)

router.get('/addPost', Controller.formAddPost)

router.post('/addPost', Controller.addPost)



module.exports=router