const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
username:{
    type: String,
},
email: {
    type: String,
},
password:{
    type: String,
},
is_admin:{
    type: Boolean,
},
score:{
    type: Number,
    default:0
}

})

const User = mongoose.model('User', UsersSchema);

module.exports = User;