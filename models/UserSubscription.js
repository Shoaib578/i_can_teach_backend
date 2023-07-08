const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSubscriptionSchema = new Schema({
expiry_date:{
    type: Date,
},
start_date: {
    type: Date,
    default: new Date()
},
user_id:{
    type: Schema.Types.ObjectId,
    
}
})

const UserSubscription = mongoose.model('UserSubscription', UserSubscriptionSchema);

module.exports = UserSubscription;