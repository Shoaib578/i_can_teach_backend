const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
answer:{
    type: String,
},
correct: {
    type: Boolean,
},
question_id:{
    type: Schema.ObjectId,
    
}


})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;