const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.delete('/logout', AuthController.logout)

router.post('/refresh-token', AuthController.refreshToken)
router.get('/getIdFromAccessToken', AuthController.getIdFromAccessToken)

router.get('/mailing/confirmation/:token', AuthController.ConfirmAccount)

module.exports = router