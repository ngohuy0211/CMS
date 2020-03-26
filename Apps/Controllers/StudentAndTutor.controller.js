const Models = require('../Models/Models')
const mongoose = require("../../common/database")();
function Class_Page(req, res)
{
   return res.render('TutorAndStudent/index')
}
function Profile_Page(req, res)
{
    res.render('TutorAndStudent/profile/detail')
}
module.exports = {
    Class_Page: Class_Page,
    Profile_Page: Profile_Page
}