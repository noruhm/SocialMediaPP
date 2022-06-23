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

router.get('/home', cekSignIn, Controller.showAllPost) 

router.get('/logout', Controller.logOut)

router.use('/account', accountRoutes)

router.get('/profile/:username', cekSignIn, Controller.profile)

router.get('/addPost', cekSignIn, Controller.formAddPost)

router.post('/addPost',cekSignIn, Controller.addPost)

router.get('/edit/:postId', cekSignIn, Controller.formEditPost)

router.post('/edit/:postId', cekSignIn, Controller.updatePost)

router.get('/delete/:postId', cekSignIn, Controller.deletePost)




module.exports=router
