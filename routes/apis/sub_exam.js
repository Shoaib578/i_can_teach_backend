const router = require('express').Router();

const mongoose = require('mongoose');
const Exam = require('../../models/exam');
const SubExam = require('../../models/SubExam');
const UserExamHistory = require('../../models/UserExamsHistory');

router.post('/add_subexam',(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const exam_id = req.body.exam_id
    const total_score = req.body.total_score

    const time = req.body.time
    new_sub_exam = new SubExam({
        "title":title,
        "description":description,
        "exam_id":exam_id,
        "total_score":total_score,
        "time":time
    })
    new_sub_exam.save()
    res.json({
        "status":"Sub exam added successfully",
        "is_added":true
    })
})


router.get('/get_sub_exam_details',(req,res)=>{
    const sub_exam_id = req.query.sub_exam_id
    SubExam.findById(sub_exam_id)
    .then(data=>{
        res.json({
            "data":data
        })
    })
  
})


router.get('/check_sub_exam_given',(req,res)=>{
    const user_id = req.query.user_id
    const sub_exam_id = req.query.sub_exam_id

    UserExamHistory.findOne({ $and:[{user_id:user_id},{sub_exam_id:sub_exam_id}] })
    .then(result=>{
        
        if(!result){
            return res.json({
                "given":false
            })
        }else{
           
            return res.json({
                "given":true
            })
        }
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
