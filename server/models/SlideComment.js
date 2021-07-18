const moment = require('moment');
const mongoose = require('mongoose');
const E = require('./entity/E');

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
const SlideCommentSchema = new mongoose.Schema({
    id: Number,
    slide_id: String,
    page: Number,
    messages: [{
        id: Number,
        u_id: String,
        avatar: String,
        user_id: String,
        content: String,
        create_time: String,
    }],
    create_time: { type: String, default: local },
    update_time: { type: String, default: local },
}, { collection: 'cm_slide_comment' });
module.exports = mongoose.model('cm_slide_comment', SlideCommentSchema);
