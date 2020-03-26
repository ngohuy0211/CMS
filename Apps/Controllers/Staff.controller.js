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
function Staff_Profile(req, res) {
  return res.render("StaffPage/profile/profile");
}
function Get_Create_Faculty(req, res) {
  res.render("StaffPage/Faculty/CreateFaculty");
}
async function Post_Create_Faculty(req, res) {
  let faculty_name = req.body.faculty_name;
  let faculty_des = req.body.faculty_des;

  let New_Faculty = await new Models.FacultyModel({
    Faculty_name: faculty_name,
    Faculty_des: faculty_des
  });
  New_Faculty.save(err => {
    if (err) return console.log(err);
    return res.redirect("/Faculty");
  });
}
function Get_Update_Faculty(req, res) {
  let faculty_id = req.params.faculty_id;
  Models.FacultyModel.findById({ _id: faculty_id }).exec((err, faculty) => {
    if (err) console.log(err);
    return res.render("StaffPage/Faculty/updateFaculty", {
      data: { faculty: faculty }
    });
  });
}
function Delete_Faculty(req, res) {
  let faculty_id = req.params.faculty_id;
  Models.FacultyModel.findByIdAndDelete({ _id: faculty_id }).exec(err => {
    if (err) return console.log(err);
    return res.redirect("/Faculty");
  });
}
async function Subject_Page(req, res) {
  let facultyId = req.params.faculty_id;
  let subject = await Models.SubjectModel.find({Faculty_id: facultyId});
  return res.render("StaffPage/Subject/index", { data: { subject: subject , faculty: facultyId} });
}
async function Class_Page(req, res) {
  let Subject_id = req.params.subject_id;
  let Class = await Models.ClassModel.find({ Subject_id: Subject_id });
  return res.render("StaffPage/class/index", { data: { class: Class } });
}
function Get_Create_Subject(req, res) {
  return res.render("StaffPage/Subject/createSubject", {data:{}});
}
async function Post_Create_Subject(req, res) {
  let subject_id = req.body.subject_id
  let subject_name = req.body.subject_name
  let subject_des = req.body.subject_des
  let New_Subject = await new Models.SubjectModel({
    Subject_ID: subject_id,
    Subject_name: subject_name,
    Subject_des: subject_des,
    Create_at_: '',
    Update_at: '',
    Faculty_id: req.params.faculty_id
  })
  New_Subject.save((err)=>{
    if(err){
      console.log(err)
      let error = " Subject already exist"
      return res.render('StaffPage/Subject/createSubject', {data:{err: error}})
    }
    return res.redirect('/Faculty/Subject/:' + req.params.faculty_id)
  })
}
function Get_Update_Subject(req, res) {
  let subject_id = req.params.subject_id;
  Models.SubjectModel.findById({ _id: subject_id }).exec((err, subject) => {
    if (err) console.log(err);
    return res.render("StaffPage/Subject/updateSubject", {
      data: { subject: subject }
    });
  });
}
function Get_Delete_Subject(req, res) {
  let subject_id = req.params.subject_id;
  Models.SubjectModel.findByIdAndDelete({ _id: subject_id }).exec(err => {
    if (err) console.log(err);
    return res.redirect("/Faculty/Subject/:faculty_id");
  });
}
module.exports = {
  Page_Index: Page_Index,
  Subject_Page: Subject_Page,
  Class_Page: Class_Page,
  Faculty_Page: Faculty_Page,
  Staff_Profile: Staff_Profile,
  Get_Create_Faculty: Get_Create_Faculty,
  Post_Create_Faculty: Post_Create_Faculty,
  Get_Update_Faculty: Get_Update_Faculty,
  Delete_Faculty: Delete_Faculty,
  Get_Create_Subject: Get_Create_Subject,
  Post_Create_Subject:Post_Create_Subject,
  Get_Update_Subject: Get_Update_Subject,
};
