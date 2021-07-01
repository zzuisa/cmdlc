const mongoose = require('mongoose');

const CommonSchema = new mongoose.Schema({
    id: Number,
    path: Number,
    name: String,
    type: Number,
    size: String,
    des: String,
    create_time: String,
    update_time: String,
}, { collection: 'cm_common_file' });

module.exports = mongoose.model('cm_common_file', CommonSchema);
