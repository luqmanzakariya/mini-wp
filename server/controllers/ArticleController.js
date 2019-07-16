const Article = require('../models/article')

class ArticleController {
    static create (req, res, next){
        // console.log('ini masuk req user', req.user)
        // console.log('ini req body', req.body)
        let input = {
            title : req.body.title,
            content : req.body.content,
            created_at : new Date(),
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
            console.log('ini masuk data findAll', data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete (req, res, next){
        console.log('masuk controller deleteTodo')
        // console.log(req.params.id)
        // console.log(req.params)
        Article.deleteOne({
            _id : req.params.id
        })
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne (req, res, next){
        Article.find({
            _id : req.params.id
        })
        .then((data)=>{
            console.log('ini masuk data findOne', data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update (req, res, next){
        console.log('masuk update')
        Article.updateOne({_id: req.params.id}, {status: req.body.status})
        .then((data)=>{
            console.log('berhasil update')
            res.send(data)
        })
        .catch(next)
    }
}

module.exports = ArticleController