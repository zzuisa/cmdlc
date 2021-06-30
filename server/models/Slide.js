const moment = require('moment');

const mongoose = require('mongoose');

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
const SlideSchema = new mongoose.Schema({
    id: Number,
    user_id: { type: Number, default: 1 },
    type: { type: Number, default: 0 },
    topic: String,
    name: String,
    des: String,
    path: String,
    create_time: { type: String, default: local },
    update_time: { type: String, default: local },
}, { collection: 'cm_slide' });
module.exports = mongoose.model('cm_slide', SlideSchema);
