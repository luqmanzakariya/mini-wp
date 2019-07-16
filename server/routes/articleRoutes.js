const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const authentication = require('../middlewares/authentication').authentication
const authorization = require('../middlewares/authorization').authorization

router.use(authentication)
router.post('/create', ArticleController.create)
router.get ('/findAll', ArticleController.findAll)
router.delete ('/:id', authorization, ArticleController.delete)
router.patch ('/:id', authorization, ArticleController.update)
router.get ('/:id', authorization, ArticleController.findOne)


module.exports = router