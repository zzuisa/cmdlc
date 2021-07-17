const moment = require('moment');

let date = moment.utc().format();
let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
exports.Message = class Message {
    constructor(id, uId, userId, content) {
        this.id = id;
        this.u_id = uId;
        this.user_id = userId;
        this.content = content;
        this.avatar = 'https://eu.ui-avatars.com/api/?name=Admin';
        this.create_time = local;
    }

    init() {
        return new Message(0, '0', 'System', 'hello every,let\'s talk!');
    }
};
