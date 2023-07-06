const router = require('express').Router();

const mongoose = require('mongoose');
const Exam = require('../../models/exam');
const SubExam = require('../../models/SubExam');

router.route('/add_subexam',(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const exam_id = req.body.exam_id

    new_sub_exam = new SubExam({
        "title":title,
        "description":description,
        "exam_id":exam_id
    })
    new_sub_exam.save()
    res.json({
        "status":"Sub exam added successfully",
        "is_added":true
    })
})


router.delete('/delete_sub_exam', (req,res)=>{
const id = req.query.id

SubExam.findByIdAndDelete(id)
.then(result=>{
    res.json({
        "status":"Sub exam deleted successfully",
        "is_deleted":true
    })
})
})


module.exports = router
