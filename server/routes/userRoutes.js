const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login/google', userController.loginGoogle)

module.exports = router