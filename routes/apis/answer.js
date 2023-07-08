const router = require('express').Router();

const mongoose = require('mongoose');
const Answer = require('../../models/Answer');


router.post('/add_answer',(req,res)=>{
    const question_id = req.body.question_id
    const answer = req.body.answer
    const correct = req.body.correct

    const newAnswer = new Answer({
        question_id: question_id,
        answer: answer,
        correct: correct
    })
    newAnswer.save()
    res.json({
        "status":"Answer Added Successfully",
        "is_added":true
    })
})


router.get('/get_answers',(req,res)=>{
    const question_id = req.query.question_id
    Answer.find({question_id:question_id})
    .then((data)=>{
        res.json({
            "data":data
        })
    })
})

router.delete('/delete_answer',(req,res)=>{
    const answer_id = req.query.answer_id
    Answer.findByIdAndDelete(answer_id)
    .then((result)=>{
        res.json({
            "status":"Answer Deleted Successfully",
            "is_deleted":true
        })
    })
})
module.exports = router;