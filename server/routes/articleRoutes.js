const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const authentication = require('../middlewares/authentication').authentication
const authorization = require('../middlewares/authorization').authorization
const images = require('../helpers/file')

router.use(authentication)
router.post('/create', images.multer.single('file'), images.sendUploadToGCS, ArticleController.create)
router.get('/allUserArticle', ArticleController.allUserArticle)
router.get ('/findAll', ArticleController.findAll)
router.delete ('/:id', authorization, ArticleController.delete)
router.patch ('/:id', images.multer.single('file'), images.sendUploadToGCS, authorization, ArticleController.update)
router.get ('/:id', ArticleController.findOne)
// router.patch ('/:id', ArticleController.update)



module.exports = router