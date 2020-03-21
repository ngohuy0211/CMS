const Models = require('../Models/Models')
const mongoose = require("../../common/database")();
function Class_Page(req, res)
{
   return res.render('TutorAndStudent/index')
}
module.exports = {
    Class_Page: Class_Page
}