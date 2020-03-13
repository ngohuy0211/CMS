const router = require('express').Router()
const HomeController = require('../Apps/Controllers/Home.controller')
const auth = require('../Apps/midderware/au.midderware')

router.get('/', HomeController.Home_Page)
router.get('/login', HomeController.GetLogin)
router.post('/login', HomeController.PostLogin)


module.exports = router
