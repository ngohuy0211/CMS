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
module.exports = {
    posttest: posttest,
    test: test

}