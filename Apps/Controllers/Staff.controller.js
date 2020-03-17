const Models = require('../Models/Models')
const mongoose = require('../../common/database')()

async function Page_Index(req, res)
{
    return res.render('StaffPage/index')
}
function Faculty_Page(req, res)
{
    Models.FacultyModel.find({}).exec((err, faculty)=>{
        if(err) return console.log(err)
        res.render('StaffPage/Faculty/index', {data:{faculty:faculty}})
    })
}
async function Subject_Page(req, res)
{
    let Faculty = req.params.faculty_id
    let subject = await Models.SubjectModel.find({})
    return res.render('StaffPage/Subject/index', {data:{subject:subject}})
}
async function Class_Page(req, res)
{
    let Class = await Models.ClassModel.find({})
    res.render('StaffPage/class/index', {data:{class:Class}})
}
module.exports = {
    Page_Index: Page_Index,
    Subject_Page: Subject_Page,
    Class_Page: Class_Page,
    Faculty_Page: Faculty_Page

}