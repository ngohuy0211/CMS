const Models = require('../Models/Models')
const mongoose = require('../../common/database')()
function test (req, res)
{
    res.render('test')
}
async function posttest(req, res)
{
   let user_role = req.body.role_name
   console.log(user_role)
    NewRole = await new Models.RoleModel({roleName:user_role})
    NewRole.save((err)=>{
        if(err) console.error(err.message)
        else console.log('success')
    })
}
function getLogin(req, res)
{
    res.render('login', {data:{}})
}
function posLogin(req, res)
{
    let email = req.body.email
    let password = req.body.password
    Models.UserModel.findOne({User_mail: email}).exec((err, docs)=>{
        if(docs === null)
       {
           let error = 'Wrong Email'
           res.render('login', {data:{error:error}})
           return
        }
       if(docs.User_pass !== password)
       {
        res.render('login', {error:['Wrong password!'], values: req.body})
        return
       }
        res.cookie('userId', docs._id, {maxAge: 9999})
       res.redirect('/')
    })
}
module.exports = {
    posttest: posttest,
    test: test,
    getLogin: getLogin,
    posLogin: posLogin

}