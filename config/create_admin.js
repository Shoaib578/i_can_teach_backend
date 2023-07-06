const User = require('../models/User')
const bcrypt = require('bcrypt');        
const saltRounds = 10;

function create_admin(){
    User.findOne({is_admin:true})
    .then(res=>{
        if(res == null){
            bcrypt.hash('Games',saltRounds, (error, hash) => {
            new_admin = new User({
                "username":"Admin",
                "email":"theadmin@gmail.com",
                "password":hash,
                "is_admin":true
            })
            new_admin.save()
            console.log("Admin created")
        })
        }else{
            console.log("Admin already exists")
        }
    })
    .catch(err=>{
        console.log(err.message)
    })
}


module.exports = create_admin
