const { Post, Tag, User} = require('../models')
const { Op } = require('sequelize')

class Controller{

    static landingPage(req,res){
        res.render('landingPage')
    }

    static showAllPost(req,res){
        const { search } = req.query
        const options = {
            order:[['createdAt', 'DESC']]
        }

        if(search){
            options.where ={
                title:{
                    [Op.iLike]: `%${search}%`,
                }
            }
        }

        Post.findAll(options)
        .then(post=>{
            res.render('home', {post})
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
    }

    static profile(req,res){
        res.send('profilee')
    }

    static formAddPost(req,res){
        Tag.findAll()
        .then(result=>{
            res.render('formAddPost', {result})
        })
        .catch(err=>{
            res.send(err)
        })
        
    }

    static addPost(req,res){
        const GetLocation = require('location-by-ip');
        const SPOTT_API_KEY = '4add49e12cmsh77b2507efa94f0ep1655eajsnce8669274ed4';

        let location =''
        const getLocation = new GetLocation(SPOTT_API_KEY)  
        getLocation.byMyIp()
        .then(data=>{
            location = data.name
        })
        .catch(err=>{
            console.log(err)
        })

            const { title, imgUrl ,TagId} = req.body
        setTimeout(() => {
            const UserId = 1
            Post.create({title, imgUrl ,TagId: +TagId, UserId : +UserId, location})
            .then(result=>{
                res.redirect('/home')
            })
            .catch(err=>{
                console.log(err)
                res.send(err)
            })
        }, 2000);
    }
}

module.exports=Controller