const router = require('express').Router();
const Subscription = require('../../models/Subscription')
const mongoose = require('mongoose')

router.post('/add_subscription',(req,res)=>{

    const title = req.body.title
    const description = req.body.description
    const duration = req.body.duration
    const price = req.body.price
    const new_subscription = new Subscription({
        "title":title,
        "description": description,
        "duration":duration,
        "price":price
    })
    new_subscription.save()
    return res.send({
        "is_added":true,
        "status":"Subscription added"
    })

})



router.get('/get_all_subscriptions',(req,res)=>{
    Subscription.find()
    .then(data=>{
        res.json({
            "data":data,
           
        })
    })
})

router.delete('/delete_subscription',(req,res)=>{
    const id = req.query.id
    Subscription.findByIdAndDelete(id)
    .then(result=>{
        res.json({
            "is_deleted":true,
            "status":"Subscription deleted"
        })
    })
    .catch(err=>{
        res.json({
            "is_deleted":false,
            "status":err.message
        })
    })
})

module.exports = router;