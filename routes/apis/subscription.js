const router = require('express').Router();
const Subscription = require('../../models/Subscription')
const mongoose = require('mongoose');
const UserSubscription = require('../../models/UserSubscription');
const stripe = require('stripe')('sk_test_51Li9vSLrpfnp4zWJmdpNm8vuzpLLpwbbVGzfytQbeVWeYDE9wXSH48h1Rsufx08gqTyqefTlYhSop6AZJh3vprXJ00xTEddr3r');

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

router.post('/buy_subscription',(req,res)=>{
    const user_id = req.body.user_id
    const duration_days = req.body.duration_days

    var current_date = new Date();
    var expiry_date = current_date.setDate(current_date.getDate() + duration_days);
    UserSubscription.findOne({user_id:user_id})
    .then(async(result)=>{
        if(result){

            const filter = {_id:result.id}
            let updateDoc = {
                $set:{
                    "expiry_date": expiry_date,
                    "start_date":new Date()
                }
            }

            await UserSubscription.updateMany(filter, updateDoc)
            return res.json({
                "is_bought":true,
                "status":"Bought Successfully"
            })

           
        }else{
           
            const new_user_subscription = new UserSubscription({
                "expiry_date": expiry_date,
                "user_id":user_id
            })
            new_user_subscription.save()
            return res.json({
                "is_bought":true,
                "status":"Bought Successfully"
            })

        }
    })
    
})


router.get('/check_user_subscription',(req,res)=>{
    const user_id = req.query.user_id
    UserSubscription.findOne({user_id:user_id})
    .then(result=>{
        
        let current_date = new Date()
       
        if(!result || current_date>result.expiry_date){
            return res.json({
                "has_subscription":false
            })
        }else{
            return res.json({
                "has_subscription":true
            })
        }
    })
})


router.get('/get_subscription_details',(req,res)=>{
    const subscription_id = req.query.subscription_id
    Subscription.findById(subscription_id)
    .then(data=>{
        res.json({
            "data":data
        })
    })
})

router.post('/create_payment_intent',async(req,res)=>{
    const amount = req.body.amount


    const paymentIntent = await stripe.paymentIntents.create({
    amount: amount*100,
    currency: 'usd',
    automatic_payment_methods: {enabled: true},
    });

    return res.json({
        "client_secret":paymentIntent.client_secret
    })
})
module.exports = router;