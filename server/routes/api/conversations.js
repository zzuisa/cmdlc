const Conversation = require('../../models/Conversation');
const E = require('../../models/entity/E');

module.exports = (app) => {
    app.get('/api/conversations/:channelName', (req, res, next) => {
        Conversation.findOne({ channel_name: req.params.channelName })
            .exec()
            .then((conversation) => res.json(conversation))
            .catch((err) => next(err));
    });
    app.post('/api/conversations/:channelName', (req, res, next) => {
        let cm = req.params.channelName;
        let data = req.body;
        const message = new E.Message().init();
        message.content = data.content;
        message.user_id = 1;
        Conversation.findOne({ channel_name: cm }).exec().then((r) => {
            r.messages.push(message);
            r.save();
            res.json({ code: 0 });
        });
    });

    app.delete('/api/conversations/:id', (req, res, next) => {
        Conversation.findOneAndDelete({ _id: req.params.id })
            .exec()
            .then((conversation) => res.json())
            .catch((err) => next(err));
    });

    app.put('/api/conversations/:id/increment', (req, res, next) => {
        Conversation.findById(req.params.id)
            .exec()
            .then((conversation) => {
                conversation.count++;

                conversation.save()
                    .then(() => res.json(conversation))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });

    app.put('/api/conversations/:id/decrement', (req, res, next) => {
        Conversation.findById(req.params.id)
            .exec()
            .then((conversation) => {
                conversation.count--;

                conversation.save()
                    .then(() => res.json(conversation))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });
};
