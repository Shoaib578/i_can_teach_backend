const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubExamSchema = new Schema({
title:{
    type: String,
},
description: {
    type: String,
},
exam_id:{
    type:Schema.ObjectId
},
total_score:{
    type:Number,
    
}


})

const SubExam = mongoose.model('SubExamSchema', SubExamSchema);

module.exports = SubExam;