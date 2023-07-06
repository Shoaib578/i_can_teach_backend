const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamSchema = new Schema({
title:{
    type: String,
},
description: {
    type: String,
},


})

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;