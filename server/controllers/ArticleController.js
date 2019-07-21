const Article = require('../models/article')

class ArticleController {
    static create (req, res, next){
        let input = {
            title : req.body.title,
            content : req.body.content,
            created_at : new Date(),
            fileUrl: req.file.cloudStoragePublicUrl,
            UserId : req.user.id
        }
        Article.create(input)
            .then((article)=>{
                res.status(201).json(article)
            })
            .catch(next)
    }

    static findAll (req, res, next){
        Article.find({
            UserId : req.user.id
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static allUserArticle (req, res, next){
        Article.find({
            UserId : {$nin: [`${req.user.id}`] }
            // UserId : req.user.id
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete (req, res, next){
        console.log('masuk controller deleteTodo')
        Article.deleteOne({
            _id : req.params.id
        })
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne (req, res, next){
        Article.findOne({
            _id : req.params.id
        })
        .then((data)=>{
            console.log('ini masuk data findOne', data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update (req, res, next){
        let input = {
            title : req.body.title,
            content : req.body.content,
            created_at : new Date(),
            fileUrl: req.file.cloudStoragePublicUrl,
            UserId : req.user.id
        }
        console.log('ini inputnya', input)
        Article.updateOne({_id: req.params.id}, input)
        .then((data)=>{
            console.log('berhasil update')
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ArticleController