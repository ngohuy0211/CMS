const router = require('express').Router()
const HomeController = require('../Apps/Controllers/Home.controller')
const StaffController = require('../Apps/Controllers/Staff.controller')
const auth = require('../Apps/midderware/au.midderware')

router.get('/', HomeController.Home_Page)
router.get('/login', HomeController.GetLogin)
router.post('/login', HomeController.PostLogin)
router.get('/staff',auth.reqAuth, auth.CheckRole, StaffController.Page_Index)

module.exports = router
