
class Controller{

    static landingPage(req,res){
        res.render('landingPage')
    }

    static home(req,res){
        const userId = req.session.userId
        res.render('home', {userId})
    }
}

module.exports=Controller