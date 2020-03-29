const express = require('express')
const router = express.Router()
const TutorAndStudent = require('../Apps/Controllers/StudentAndTutor.controller')

router.route('/')
    .get(TutorAndStudent.Class_Page)
router.route('/profile')
    .get(TutorAndStudent.Profile_Page)
module.exports = router