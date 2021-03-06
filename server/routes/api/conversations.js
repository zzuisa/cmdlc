const moment = require('moment');
const Conversation = require('../../models/Conversation');
const E = require('../../models/entity/E');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');

const { C } = require('../../utils/constant');

let R = new T();
module.exports = (app) => {
    app.get('/api/conversations/:channelName', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            Conversation.findOne({ channel_name: req.params.channelName })
                .exec()
                .then((conversation) => {
                    if (conversation !== null) {
                        res.json(R.ok(conversation));
                    } else {
                        let conv = new Conversation();
                        const message = new E.Message().init();
                        let date = moment.utc().format();
                        let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
                        message.create_time = local;
                        conv.messages = [message];
                        conv.channel_name = req.params.channelName;
                        conv.save();
                        res.json(R.ok(conv));
                    }
                })
                .catch((err) => res.json(R.error()));
        } else {
            res.json(R.error(301, C[301]));
        }
    });
    app.post('/api/conversations/:channelName', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            let cm = req.params.channelName;
            let data = req.body;
            const message = new E.Message().init();
            let date = moment.utc().format();
            let local = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
            message.create_time = local;
            message.content = data.content;
            message.avatar = data.eventUser.avatar;
            message.user_id = data.eventUser.name;
            message.u_id = data.eventUser._id;
            Conversation.findOne({ channel_name: cm }).exec().then((r) => {
                if (r !== null) {
                    r.messages.push(message);
                    r.save();
                    res.json(R.ok(r));
                } else {
                    let conv = new Conversation();
                    conv.messages = [message];
                    conv.channel_name = cm;
                    conv.save();
                    res.json(R.ok(conv));
                }
            });
        } else {
            res.json(R.error(301, C[301]));
        }
    });
};
