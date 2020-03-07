const router = require('express').Router()
const test = require('../Apps/Controllers/test')
router.get('/', test.test)
router.post('/', test.posttest)

module.exports = router
