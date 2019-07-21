const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
    title : {
        type: String,
        required: [true, "Title cannot be empty"]
    },
    content : {
        type: String
    },
    fileUrl: {
        type: String
    },
    created_at : {
        type : Date
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

let Article = mongoose.model('Articles', ArticleSchema)

module.exports = Article