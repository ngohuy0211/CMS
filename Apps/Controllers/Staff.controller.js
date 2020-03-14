const Models = require('../Models/Models')
const mongoose = require('../../common/database')()
async function Page_Index(req, res)
{
    let userid = req.cookies.userId
    let user = await Models.UserModel.find({_id: userid})
    res.render('StaffPage/index', {data:{user:user}})
}

module.exports = {
    Page_Index: Page_Index
}