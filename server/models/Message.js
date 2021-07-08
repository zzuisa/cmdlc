const mongoose = require('mongoose');
const messages = require('./entity/E');

const MessageSchema = new mongoose.Schema({
    type: Number,
    user_id: Number,
    content: String,
    create_time: String,
    default: 0,
}, { collection: 'cm_message' });

module.exports = mongoose.model('cm_message', MessageSchema);
