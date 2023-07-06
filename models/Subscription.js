const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
title:{
    type: String,
},
description: {
    type: String,
},
duration:{
    type: Number,
},
price:{
    type: Number
}
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;