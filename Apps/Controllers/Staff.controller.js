const Models = require("../Models/Models");
const mongoose = require("../../common/database")();
const path = require("path");
const formidable = require('formidable')
const mv = require('mv')
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
  return res.render("StaffPage/Faculty/CreateFaculty", { data: {} });
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
    return res.redirect("/staff/Faculty");
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
function Post_Upload_Faculty(req, res) {
  let faculty_name = req.body.faculty_name;
  let faculty_des = req.body.faculty_des;
  let faculty_id = req.params.faculty_id;
  Models.FacultyModel.findByIdAndUpdate(faculty_id, {
    Faculty_name: faculty_name,
    Faculty_des: faculty_des
  }).exec(err => {
    if (err) return console.log(err);
    return res.redirect("/staff/Faculty");
  });
}
function Delete_Faculty(req, res) {
  let faculty_id = req.params.faculty_id;
  Models.FacultyModel.findByIdAndDelete({ _id: faculty_id }).exec(err => {
    if (err) return console.log(err);
    return res.redirect("/staff/Faculty");
  });
}
async function Subject_Page(req, res) {
  let facultyId = req.params.faculty_id;
  let subject = await Models.SubjectModel.find({ Faculty_id: facultyId });
  return res.render("StaffPage/Subject/index", {
    data: { subject: subject, faculty: facultyId }
  });
}
function Get_Create_Subject(req, res) {
  let faculty_id = req.params.faculty_id;
  return res.render("StaffPage/Subject/createSubject", {
    data: { faculty: faculty_id }
  });
}
async function Post_Create_Subject(req, res) {
  let subject_id = req.body.subject_id;
  let subject_name = req.body.subject_name;
  let subject_des = req.body.subject_des;
  let Create_at = new Date();
  let date =
    Create_at.getFullYear() +
    "-" +
    (Create_at.getMonth() + 1) +
    "-" +
    Create_at.getDate() +
    "/" +
    Create_at.getHours() +
    ":" +
    Create_at.getMinutes() +
    ":" +
    Create_at.getSeconds();
  let New_Subject = await new Models.SubjectModel({
    Subject_ID: subject_id,
    Subject_name: subject_name,
    Subject_des: subject_des,
    Create_at: date,
    Update_at: "",
    Faculty_id: req.body.faculty_id
  });
  New_Subject.save(err => {
    if (err) {
      let error = " Subject already exist";
      return res.render("StaffPage/Subject/createSubject", {
        data: { err: error }
      });
    }
    return res.redirect("/staff/Faculty/" + req.body.faculty_id + "/Subject");
  });
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
  let faculty_id = req.params.faculty_id;
  Models.SubjectModel.findByIdAndDelete({ _id: subject_id }).exec(err => {
    if (err) console.log(err);
    return res.redirect("/staff/Faculty/" + faculty_id + "/Subject");
  });
}
async function Class_Page(req, res) {
  let Subject_id = req.params.subject_id;
  let Class = await Models.ClassModel.find({ Subject_id: Subject_id });
  return res.render("StaffPage/class/index", {
    data: { class: Class, subject: Subject_id }
  });
}
function Get_Create_Class(req, res) {
  return res.render("StaffPage/class/create", {
    data: { subject: req.params.subject_id }
  });
}
async function Post_Create_Class(req, res) {
  let class_id = req.body.class_id;
  let class_name = req.body.class_name;
  let Create_at = new Date();
  let date =
    Create_at.getFullYear() +
    "-" +
    (Create_at.getMonth() + 1) +
    "-" +
    Create_at.getDate() +
    "/" +
    Create_at.getHours() +
    ":" +
    Create_at.getMinutes() +
    ":" +
    Create_at.getSeconds();
  let New_Class = await new Models.ClassModel({
    Class_ID: class_id,
    Class_name: class_name,
    Create_at: date,
    Update_at: "",
    Subject_id: req.params.subject_id
  });
  New_Class.save(err => {
    if (err) {
      let error = "Class already exist";
      return res.render("StaffPage/class/create", { data: { error: error } });
    }
    return res.redirect(
      "/staff/Faculty/Subject/" + req.params.subject_id + "/Class/"
    );
  });
}
async function Get_Update_Class(req, res) {
  let class_id = req.params.class_id;
  let Class = await Models.ClassModel.findById({ _id: class_id });
  return res.render("StaffPage/class/edit", {
    data: { class: Class, subject: req.params.subject_id }
  });
}
function Post_Update_Class(req, res) {
  let classId = req.params.class_id;
  let class_id = req.body.class_id;
  let class_name = req.body.class_name;
  let DateTime = new Date();
  let date =
    DateTime.getFullYear() +
    "-" +
    (DateTime.getMonth() + 1) +
    "-" +
    DateTime.getDate() +
    "/" +
    DateTime.getHours() +
    ":" +
    DateTime.getMinutes() +
    ":" +
    DateTime.getSeconds();
  Models.ClassModel.findByIdAndUpdate(
    { _id: classId },
    { Update_at: date, Class_ID: class_id, Class_name: class_name }
  ).exec(err => {
    if (err) console.log(err);
    return res.redirect(
      "/staff/Faculty/Subject/" + req.params.subject_id + "/Class"
    );
  });
}
function Get_Delete_Class(req, res) {
  let class_id = req.params.class_id;
  Models.ClassModel.findOneAndDelete({ _id: class_id }).exec(err => {
    if (err) console.log(err);
    return res.redirect(
      "/staff/Faculty/Subject/" + req.params.subject_id + "/Class"
    );
  });
}
async function Get_Class_Detail(req, res) {
  let class_id = req.params.class_id;
  let subject_id = req.params.subject_id;
  let Class = await Models.ClassModel.findById({ _id: class_id });
  let Subject = await Models.SubjectModel.findById({ _id: subject_id });
  // let Class_Detail = await Models.ClassDetailModel.findOne({Class_id:class_id})
  // let MemberOfClass = await Models.UserModel.findById({_id: Class_Detail.User_id})
  // let Role = await Models.RoleModel.findById({_id : MemberOfClass.User_role})
  return res.render("StaffPage/class/detail", {
    data: { Class: Class, Subject: Subject }
  });
}
function Get_Exercise(req, res) {
  let class_id = req.params.class_id;
  Models.ExerciseModel.findById({ Class_ID: class_id }).exec(exercise => {
    return res.render("StaffPage/class/exercise", {
      data: { exercise: exercise }
    });
  });
}
function Index_Account(req, res) {
  Models.RoleModel.find({}).exec((err, Role) => {
    return res.render("StaffPage/account/index", { data: { Role: Role } });
  });
}
function List_Account(req, res) {
  let role_id = req.params.role_id;
  Models.UserModel.find({ User_role: role_id }).exec((err, account) => {
    return res.render("StaffPage/account/listAccount", {
      data: { account: account, role: role_id }
    });
  });
}
function Get_Create_Account(req, res)
{
  let role = req.params.role_id
  return res.render('StaffPage/account/create', {data:{role: role}})
}
function Post_Create_Account(req, res)
{
  let DateTime = new Date();
  let date =
    DateTime.getFullYear() +
    "-" +
    (DateTime.getMonth() + 1) +
    "-" +
    DateTime.getDate() +
    "/" +
    DateTime.getHours() +
    ":" +
    DateTime.getMinutes() +
    ":" +
    DateTime.getSeconds();
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files)=>{
    let oldUrl = files.User_avatar.path
    let newUrl = path.join(__dirname, '../../Public/images', files.User_avatar.name)
    mv(oldUrl, newUrl, (err)=>{
      if(err) throw err
      fields.User_avatar = files.User_avatar.name
      fields.Create_at = date
      fields.Update_at = ''
      let New_Account = new Models.UserModel(fields, {versionKey: false})
      New_Account.save((err)=>{
        if(err) {
          let error = "Email already exist"
          return res.render('StaffPage/account/create', {data:{error:error}})
        }
        return res.redirect("/staff/Account/"+req.params.role_id)
      })
    })
  })
}
async function Detail_Account(req, res)
{
  let user_id = req.params.user_id
  let role = req.params.role_id
  let user_role = await Models.RoleModel.findById({_id: role})
  let User = await Models.UserModel.findById({_id: user_id})
  return res.render('StaffPage/account/detail', {data:{user: User, role:role, userRole: user_role}})
 
}
module.exports = {
  Page_Index: Page_Index,
  Staff_Profile: Staff_Profile,
  Faculty_Page: Faculty_Page,
  Get_Create_Faculty: Get_Create_Faculty,
  Post_Create_Faculty: Post_Create_Faculty,
  Get_Update_Faculty: Get_Update_Faculty,
  Post_Upload_Faculty: Post_Upload_Faculty,
  Delete_Faculty: Delete_Faculty,
  Subject_Page: Subject_Page,
  Get_Create_Subject: Get_Create_Subject,
  Post_Create_Subject: Post_Create_Subject,
  Get_Update_Subject: Get_Update_Subject,
  Get_Delete_Subject: Get_Delete_Subject,
  Class_Page: Class_Page,
  Get_Create_Class: Get_Create_Class,
  Post_Create_Class: Post_Create_Class,
  Get_Update_Class: Get_Update_Class,
  Post_Update_Class: Post_Update_Class,
  Get_Delete_Class: Get_Delete_Class,
  Get_Class_Detail: Get_Class_Detail,
  Get_Exercise: Get_Exercise,
  Index_Account: Index_Account,
  List_Account: List_Account,
  Get_Create_Account: Get_Create_Account,
  Post_Create_Account: Post_Create_Account,
  Detail_Account:Detail_Account
};
