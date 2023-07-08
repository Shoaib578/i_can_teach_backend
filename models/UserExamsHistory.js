const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserExamHistorySchema = new Schema({
sub_exam_id:{
    type: Schema.ObjectId,
},
user_id:{
    type: Schema.ObjectId,
},
score:{
    type: Number,
},
taken_date:{
    type:Date,
    default: new Date()
},



})

const UserExamHistory = mongoose.model('UserExamHistory', UserExamHistorySchema);

module.exports = UserExamHistory;