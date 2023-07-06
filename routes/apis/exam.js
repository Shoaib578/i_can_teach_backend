const router = require('express').Router();

const mongoose = require('mongoose');
const Exam = require('../../models/exam');
const SubExam = require('../../models/SubExam');

router.post('/add_exam',(req,res)=>{
    const exam_title = req.body.title
    const exam_description = req.body.description
    
    new_exam =new Exam({
        "title":exam_title,
        "description":exam_description,
       
    })
    new_exam.save()
    res.json({
        "status":"Exam Added Successfully",
        "is_added":true
    })
})

router.get('/get_all_exams',(req,res)=>{
    Exam.find()
    .then(data=>{
        res.json({
            "data":data
        })
    })
})


router.delete('/delete_exam',(req,res)=>{
    const id = req.query.exam_id
    Exam.findByIdAndDelete(id)
    .then(result=>{
        res.json({
            "status":"Exam Deleted Successfully",
            "is_deleted":true
        })
    })
  
})





router.get('/view_exam',(req,res)=>{
const id = req.query.id

SubExam.find({exam_id:id})
.then(data=>{
    res.json({
        "data":data
    })
})
})


module.exports = router