const {User} = require('../models')
const bcrypt = require('bcryptjs')

class UserController{
    static registerForm(req,res){
        let err = []

        if(req.query.err){
            err = (req.query.err).split(',')
        }

        res.render('registerForm', {err})
    }

    static addNewUser(req,res){
        let newUser = req.body
        newUser.role = 'User'
        newUser.createdAt = newUser.updatedAt = new Date()

        User.create(newUser)
            .then(_ => res.redirect('/account/signin'))
            .catch(err => {
                if(err.name = 'Sequelize')
                err = err.errors.map(e => {
                    return e.message
                })
                console.log(err)

                res.redirect(`/account/register/?err=${err}`)
            })
    }

    static formSignIn(req,res){
        
        res.render('signIn')
    }

    static userSignIn(req,res){
        const {username, password} = req.body

        User.findOne({where:{username}})
            .then(result => {
                if(result){
                    if(bcrypt.compareSync(password, result.password)){

                        req.session.userId = result.id
                        req.session.username = result.username
                        return res.redirect('/home')
                    }else{
                        return res.redirect('/account/signin')
                    }
                }else{
                    return res.redirect('/account/signin') 
                }
            })
            .catch(err => res.send(err))
    }
}

module.exports = UserController