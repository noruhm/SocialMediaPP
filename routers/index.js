const router = require('express').Router()
const session = require('express-session')
const Controller= require('../controllers')
const accountRoutes = require('./account')

router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite:true}
}))

function cekSignIn(req,res,next){
    console.log(req.session)
    if(req.session.userId){
        next()
    }else{
        res.redirect('/account/signin')
    }
}

router.get('/', Controller.landingPage)

router.get('/home', cekSignIn, Controller.home) 

router.use('/account', accountRoutes)

module.exports= router