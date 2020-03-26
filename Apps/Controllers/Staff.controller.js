const Models = require("../Models/Models");
const mongoose = require("../../common/database")();
const path = require("path");

async function Page_Index(req, res) {
  return res.render("StaffPage/index");
}
function Faculty_Page(req, res) {
  Models.FacultyModel.find({}).exec((err, faculty) => {
    if (err) return console.log(err);
    return res.render("StaffPage/Faculty/index", {
      data: { faculty: faculty }
    });
  });
}
async function Subject_Page(req, res) {
  let Faculty = req.params.faculty_id;
  let subject = await Models.SubjectModel.find({});
  return res.render("StaffPage/Subject/index", { data: { subject: subject } });
}
async function Class_Page(req, res) {
  let Subject_id = req.params.subject_id
  let Class = await Models.ClassModel.find({Subject_id: Subject_id});
  return res.render("StaffPage/class/index", { data: { class: Class } });
}
function Staff_Profile(req, res) {

    return res.render("StaffPage/profile/profile");
}
function Get_Create_Faculty(req, res){
  res.render("StaffPage/Faculty/CreateFaculty");
}
function Post_Create_Faculty(req, res)
{
  
}
function Get_Update_Faculty(req, res)
{
  let faculty_id= req.params.faculty_id
  Models.FacultyModel.findById({_id: faculty_id}).exec((err, faculty)=>{
    if(err) console.log(err)
    return res.render("StaffPage/Faculty/updateFaculty", {data:{faculty:faculty}})
  })
}
function Delete_Faculty(req, res)
{
  let faculty_id= req.params.faculty_id
  Models.FacultyModel.findByIdAndDelete({_id: faculty_id}).exec((err)=>{
    if(err) return console.log(err)
    return res.redirect('/Faculty')
  })
}
module.exports = {
  Page_Index: Page_Index,
  Subject_Page: Subject_Page,
  Class_Page: Class_Page,
  Faculty_Page: Faculty_Page,
  Staff_Profile: Staff_Profile,
  Get_Create_Faculty:Get_Create_Faculty,
  Get_Update_Faculty:Get_Update_Faculty,
  Delete_Faculty: Delete_Faculty
};
