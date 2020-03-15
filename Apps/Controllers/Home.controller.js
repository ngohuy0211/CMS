const Models = require('../Models/Models')
const mongoose = require('../../common/database')()

function Home_Page(req, res)
{
    res.render('HomePage/index')
}
function GetLogin(req, res, next)
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
        
        Models.RoleModel.findById({_id: docs.User_role}).exec((err, role)=>{
            if(role.roleName === 'Staff')
            {
                res.cookie('userId', docs._id, {maxAge: 300000})
                return res.redirect('/staff')
            }
            if(role.roleName === 'Student')
            {
                res.cookie('userId', docs._id, {maxAge: 300000})
                return res.redirect('/')
            }
            if(role.roleName === 'Tutor')
            {
                res.cookie('userId', docs._id, {maxAge: 300000})
                return res.redirect('/')
            }
        })
    })
}
module.exports = {
    Home_Page: Home_Page,
    GetLogin: GetLogin,
    PostLogin: PostLogin
}