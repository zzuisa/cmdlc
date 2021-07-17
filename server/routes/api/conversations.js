const moment = require('moment');
const Conversation = require('../../models/Conversation');
const E = require('../../models/entity/E');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');

let R = new T();
module.exports = (app) => {
    app.get('/api/conversations/:channelName', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            Conversation.findOne({ channel_name: req.params.channelName })
                .exec()
                .then((conversation) => res.json(R.ok(conversation)))
                .catch((err) => res.json(R.error()));
        }
    });
    app.post('/api/conversations/:channelName', (req, res, next) => {
        let cm = req.params.channelName;
        let data = req.body;
        const message = new E.Message().init();
        let date = moment.utc().format();
        let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
        message.create_time = local;
        Conversation.findOne({ channel_name: cm }).exec().then((r) => {
            if (r !== null) {
                message.content = data.content;
                message.avatar = data.eventUser.avatar;
                message.user_id = data.eventUser.name;
                message.u_id = data.eventUser._id;
                r.messages.push(message);
                r.save();
                res.json(R.ok());
            } else {
                let conv = new Conversation();
                conv.messages = [message];
                conv.channel_name = cm;
                conv.save();
            }
        });
    });
};
