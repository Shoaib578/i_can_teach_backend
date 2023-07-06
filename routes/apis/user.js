const router = require('express').Router();
const User = require('../../models/User')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');        
const saltRounds = 10;

router.post('/signup',(req,res)=>{
        
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        console.log(email)
        console.log(password)
        console.log(username)


        bcrypt.hash(password,saltRounds,(err,hash)=>{
       
        
            User.findOne({email:email})
            .then(result=>{
                if(result != null){
    
                return res.send({
                    "is_registered":false,

                    "status":"User Already Exist"
                })

            }else{
                const user = new User({
                    "username":username,
                    "password":hash,
                    "email":email,  
                    "is_admin":false
                 });
    
            user.save();
            return res.send({
                "is_registered":true,
                "status":"User Registered Successfully"
            })
    
            }
    
        })
        
        
        
        })
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
     User.findOne({email:email})
     .then(user=>{
      if(user != null){
        bcrypt.compare(password, user.password, function(error, response) {
          console.log(response)
         if(response == true){
          console.log(user)
           res.send({
             "user":user,
             "is_loggedin":true,
             "status":"logged in Succesfully"
           })
         }else{
           res.send({
            "is_loggedin":false,

             "status":"Incorrect Email or password"
           })
         }
      });
      }else{
       res.send({
        "is_loggedin":false,

         "status":"Incorrect Email or password"
       })
     }
  
  
     })
})


router.post('/update_user',(req,res)=>{
    const user_id = req.body.user_id
    const username = req.body.username
    const email = req.body.email
    const new_password = req.body.new_password
    console.log(username)
    let updateDoc =""
    bcrypt.hash(new_password,saltRounds, (error, hash) => {
     
      if(new_password){
        
        updateDoc =  {
          $set: {
              "username":username,
              "email":email,
              "password":hash,
          }
    
      }
      }else{
        updateDoc =  {
          $set: {
              "username":username,
              "email":email,
          }
      }
    }

    User.findById(user_id)
    .then(async (user)=>{
  
        let filter = { _id: user_id };
        
  
        await User.updateMany(filter,updateDoc)
  
      return res.json({
        "status":"User updated succesfully",
        "is_updated":true
      })
    })
  
    })
})



router.get('/get_user_details',(req,res)=>{
  const user_id = req.query.user_id
  User.findById(user_id)
  .then(user=>{
    res.json({
      "data":user
    })
  })
})
module.exports = router;