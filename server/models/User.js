const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    type: Number, // 0:student 1:teacher 2:admin
    avatar: String,
    email: String,
    phone: String,
    create_time: String,
    update_time: String,
    delete_time: String,
    team: [String], // It should be a set of many teams object
    channels: [String], // It should be a set of many channels object
}, { collation: 'cm_user_profile' });

module.exports = mongoose.model('cm_user_profile', UserSchema);
