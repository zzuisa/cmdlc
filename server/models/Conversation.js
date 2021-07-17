const moment = require('moment');
const mongoose = require('mongoose');
const E = require('./entity/E');

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
const ConversationSchema = new mongoose.Schema({
    id: Number,
    channel_name: String,
    messages: [{
        id: Number,
        u_id: String,
        user_id: String,
        avatar: String,
        content: String,
        create_time: String,
    }],
    bulletion: String,
    create_time: { type: String, default: local },
    update_time: { type: String, default: local },
}, { collection: 'cm_conversation' });
module.exports = mongoose.model('cm_conversation', ConversationSchema);
