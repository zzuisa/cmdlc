const mongoose = require('mongoose');
const Slide = require('../../models/Slide');
const Conversation = require('../../models/Conversation');
const E = require('../../models/entity/E');
const { T } = require('../../models/entity/R');
const { C } = require('../../utils/constant');
const tools = require('../../utils/tool');

let R = new T();
module.exports = (app) => {
    app.get('/api/slides/:topic', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            let { topic } = req.params;
            let rename = `topic_${topic}`;
            Conversation.find({ channel_name: rename }).exec()
                .then((cs) => {
                    if (cs.length === 0) {
                        const conversation = new Conversation();
                        conversation.messages.push(new E.Message().init());
                        conversation.channel_name = rename;
                        conversation.save();
                    }
                });
            Slide.find({ topic })
                .exec()
                .then((slide) => res.json(R.ok(slide)))
                .catch((err) => res.json(R.error()));
        } else {
            res.json(R.error(301, C[301]));
        }
    });
    app.get('/api/detail/:id', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            Slide.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
                .exec()
                .then((slide) => res.json(R.ok(slide)))
                .catch((err) => res.json(R.error()));
        } else {
            res.json(R.error(301, C[301]));
        }
    });

    app.post('/api/slides', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            const slide = new Slide();
            slide.save()
                .then(() => res.json(R.ok(slide)))
                .catch((err) => next(R.error(501, C[501])));
        } else {
            res.json(R.error(301, C[301]));
        }
    });

    app.delete('/api/slides/:id', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            Slide.findOneAndDelete({ _id: req.params.id })
                .exec()
                .then((slide) => res.json(R.ok(slide)))
                .catch((err) => next(err));
        } else {
            res.json(R.error(301, C[301]));
        }
    });
};
