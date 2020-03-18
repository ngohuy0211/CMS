const Models = require("../Models/Models");
const mongoose = require("../../common/database")();
const jwt = require("jsonwebtoken");

function Home_Page(req, res) {
  res.render("HomePage/index");
}
function GetLogin(req, res, next) {
  res.render("HomePage/login", { data: {} });
}
function PostLogin(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  Models.UserModel.findOne({ User_mail: email }).exec((err, docs) => {
    if (docs === null) {
      let error = "Wrong Email or Password";
      res.render("HomePage/login", { data: { error: error } });
      return;
    }
    if (docs.User_pass !== password) {
      let error = "Wrong Email or Password";
      res.render("HomePage/login", { data: { error: error } });
      return;
    } else {
      // let token = jwt.sign({ name: docs.User_full }, "Team2DevelopmentCms", {
      //   algorithm: "HS256",
      //   expiresIn: "3h"
      // });
      // res.jsonp({ access_token: token });
      res.cookie('userId', docs._id, {maxAge: 300000})
      Models.RoleModel.findById({ _id: docs.User_role }).exec((err, role) => {
        if (role.roleName === "Staff") {
          return res.redirect("/staff");
        }
        if (role.roleName === "Student") {
          return res.redirect("/");
        }
        if (role.roleName === "Tutor") {
          return res.redirect("/");
        }
      });
    }
  });
}
function LogOut(req, res) {
  res.clearCookie("userId");
  res.redirect("/");
}
module.exports = {
  Home_Page: Home_Page,
  GetLogin: GetLogin,
  PostLogin: PostLogin,
  LogOut: LogOut
};
