const moment = require('moment');

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
exports.Message = class Message {
    constructor(id, userId, content) {
        this.id = id;
        this.user_id = userId;
        this.content = content;
        this.create_time = local;
    }

    init() {
        return new Message(0, 0, 'hello every,let\'s talk!');
    }
};
