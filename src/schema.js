const {Schema} = require('mongoose');

const userSchema = new Schema({
    "Name" : Schema.Types.String,
    "Age" : Schema.Types.Number,
    "Email" : Schema.Types.String,
    "Password" : Schema.Types.String
});


module.exports = {userSchema};