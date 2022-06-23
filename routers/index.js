const router = require('express').Router()
const Controller= require('../controllers')

const accountRoutes = require('./account')

router.get('/', Controller.landingPage)

router.use('/account', accountRoutes)

module.exports=router