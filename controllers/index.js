const { Post, Tag, User} = require('../models')
const { Op } = require('sequelize')
const dateFormatter = require('../helpers/dateFormatter')

class Controller{

    static landingPage(req,res){
        res.render('landingPage')
    }

    static logOut(req,res){
        req.session.destroy()
        res.redirect('/')
    }

    static showAllPost(req,res){
        const { search } = req.query
        const { userId , username  } = req.session

        const options = {
            order:[['createdAt', 'DESC']],
            include: [User, Tag]
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
            post = post.map(e=>{
                e.Tag.name = Tag.formatTag(e.Tag.name)
                return e
            })
            res.render('home', {post, userId, username, dateFormatter})
        })
        .catch(err=>{
       
            res.send(err)
        })
    }

    static profile(req,res){
        const { username } = req.params
        const data ={}
        User.findOne({where:{username:username}})
        .then(user=>{
            const id = user.id
            return User.findByPk( +id, {
                include: Post,
                order: [['createdAt', 'DESC']]
            })
        })
        .then(result=>{
            data.result = result
            return Tag.findAll()
        })
        .then(tag=>{
            res.render('profile', {result:data.result, tag, dateFormatter})
        })
        .catch(err=>{
            res.send(err)
        })

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
        const { userId } = req.session
        const { title, imgUrl ,TagId } = req.body
        let location =''

        const getLocation = new GetLocation(SPOTT_API_KEY)  
        getLocation.byMyIp()
        .then(data=>{
            location = data.name
        })
        .catch(err=>{
            console.log(err)
        })

        setTimeout(() => {
            Post.create({title, imgUrl ,TagId: +TagId, UserId : +userId, location})
            .then(result=>{
                res.redirect('/home')
            })
            .catch(err=>{
                console.log(err)
                res.send(err)
            })
        }, 2000);
    }

    static formEditPost(req,res){
        const PostId = req.params.postId

        let data = {}
        Post.findByPk(+PostId, {
            include: Tag
        })
        .then(result=>{
            data.result = result
            return Tag.findAll()
        })
        .then(tag=>{
            res.render('formEditPost', {result: data.result, tag})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static updatePost(req,res){
        const PostId = req.params.postId
        const { title, TagId } = req.body
        const { username } = req.session

        Post.update({ title, TagId }, {where:{ id : +PostId}})
        .then(result=>{
            res.redirect(`/profile/${username}`)
        })
    }

    static deletePost(req,res){
        const PostId = req.params.postId
        const { username } = req.session

        Post.destroy({where :{id: +PostId}})
        .then(result=>{
            res.redirect(`/profile/${username}`)
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports=Controller