const Models = require('../Models/Models')
const mongoose = require('../../common/database')()

function Home_Page(req, res)
{
    res.render('HomePage/index')
}
function GetLogin(req, res)
{
    res.render('HomePage/login', {data:{}})
}
function PostLogin(req, res)
{
    let email = req.body.email
    let password = req.body.password
    Models.UserModel.findOne({User_mail: email}).exec((err, docs)=>{
        if(docs === null)
       {
           let error = 'Wrong Email'
           res.render('HomePage/login', {data:{error:error}})
           return
        }
       if(docs.User_pass !== password)
       {
        let error = 'Wrong Password'
        res.render('HomePage/login', {data:{error:error}})
        return
       }
        res.cookie('userId', docs._id, {maxAge: 9999})
        res.redirect('/staff')
    })
}
module.exports = {
    Home_Page: Home_Page,
    GetLogin: GetLogin,
    PostLogin: PostLogin
}