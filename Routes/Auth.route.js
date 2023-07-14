const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')
const checkTokenapi = require('../middlewares/checkTokenapi');

router.post('/token', checkTokenapi, AuthController.requesttoken)

router.delete('/token/:client_id', AuthController.flushlogin)
router.delete('/token', AuthController.flushlogin)

module.exports = router
