const Models = require('../Models/Models')
const mongoose = require('../../common/database')()
async function checkAth(req, res, next)
{
    if(!req.cookies.userId)
    {
        res.redirect('/login')
        return
    }
  await Models.UserModel.find({_id: req.cookies.userId}).exec((err, docs)=>{
    if(docs == null)
        {
            res.redirect('/login')
            return
        }
       return next()
    })

}
async function CheckStudent(req, res, next){
    
    let user = await Models.UserModel.findById({_id: req.cookies.userId})
    Model.RoleModel.findById({_id: user.User_role}).exec((err, role)=>{
        if(role.roleName === 'Student')
        {
            next()
        }
    })
}
async function CheckStaff(req, res, next){
    if(!req.cookies.userId)
    {
        res.redirect('/login')
    }
    let user = await Models.UserModel.findById({_id: req.cookies.userId})
    Models.RoleModel.findById({_id: user.User_role}).exec((err, role)=>{
        if(role.roleName === 'Staff')
        {
            return next()
        }
        res.redirect('/login')
    })
}
async function checkTutor (req, res, next){
    
    let user = await Models.UserModel.findById({_id: req.cookies.userId})
    Model.RoleModels.findById({_id: user.User_role}).exec((err, role)=>{
        if(role.roleName === 'Tutor')
        {
            next()
        }
        res.redirect('/login')
    })
}
module.exports = {
    reqAuth: checkAth,
    CheckRole: CheckStaff,
}