const router = require('express').Router();

const mongoose = require('mongoose');
const Question = require('../../models/Question');
const UserExamHistory = require('../../models/UserExamsHistory');
const User = require('../../models/User');
const ObjectId = require('mongoose').Types.ObjectId



const update_user_score = (user_id)=>{
    UserExamHistory.find({user_id: user_id})
    .then(async(result)=>{
        let score = ''
        result.map(data=>{
            score = score+ data.score
        })

        let user_filter = {_id:user_id}
        let updateDoc = {
            $set:{
                "score":score
            }
        }

        await User.updateMany(user_filter,updateDoc)




    })
}

router.post('/add_question',(req,res)=>{
    const question = req.body.question
    const sub_exam_id = req.body.sub_exam_id
    const score = req.body.score
    const new_question = new Question({
        question:question,
        sub_exam_id:sub_exam_id,
        score:score
    })
    new_question.save()
    return res.json({
        "is_added":true,
        "status":"Question Added"
    })
})

router.get('/get_questions',(req,res)=>{
    const sub_exam_id = req.query.sub_exam_id
    Question.find({sub_exam_id:sub_exam_id})
    .then(data=>{
        res.json({
            "data":data
        })
    })
})

router.delete('/delete_question',(req,res)=>{
    const question_id = req.query.question_id
    
    Question.findByIdAndDelete(question_id)
    .then(result=>{
        res.json({
            "is_deleted":true,
            "status":"Question Deleted"
        })
    })
})


router.get('/get_main_website_questions',(req,res)=>{
    const sub_exam_id =new ObjectId(req.query.sub_exam_id)
    
    Question.aggregate([
        
        {
            $match:{
                sub_exam_id:sub_exam_id
            }
        },
        {  
            
            $lookup:{
                from:'answers',
                localField:'_id',
                foreignField:'question_id',
                as:'answers'

            }
        }
    ])
    .then(data=>{
        
        res.json({
            "data":data
        })
    })
})


router.post('/save_exam_history',(req,res)=>{
    const sub_exam_id = req.body.sub_exam_id
    const user_id = req.body.user_id
    const score = req.body.score
    UserExamHistory.findOne({ $and: [ { user_id: user_id }, { sub_exam_id: sub_exam_id }]})
    .then(async(result)=>{
        if(!result){
            const new_exam_history = new UserExamHistory({
                "score":score,
                "sub_exam_id":sub_exam_id,
                "user_id":user_id
        
            })
        
            new_exam_history.save()
            update_user_score(user_id)

            return res.json({
                "is_added":true,
                "status":"Exam History Added Successfully"
            })
        }else{
            console.log(result.id)
            const filter = {_id:result.id}
            let updateDoc =  {
                $set: {
                    "score":score,
                    "taken_date":new Date(),
                    
                }
          
            }

            await UserExamHistory.updateMany(filter,updateDoc)

            update_user_score(user_id)
            return res.json({
                "is_added":true,
                "status":"Exam History Added Successfully"
            })

        }
    })
   

})

module.exports = router