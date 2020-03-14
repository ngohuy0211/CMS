const Models = require('../Models/Models')
const mongoose = require('../../common/database')()
function Page_Index(req, res)
{
    Models.FacultyModel.find().exec((err, Faculty)=>{
        if(err) console.log(err)
        else {res.render('StaffPage/index'), {data:{Faculty:Faculty}}}
    })
}
module.exports = {
    Page_Index: Page_Index
}