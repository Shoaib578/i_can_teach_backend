const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
question:{
    type: String,
},
sub_exam_id:{
    type:Schema.ObjectId
},
score:{
    type:Number
}


})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;