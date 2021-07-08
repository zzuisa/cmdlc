const mongoose = require('mongoose');
const Slide = require('../../models/Slide');
const Conversation = require('../../models/Conversation');
const E = require('../../models/entity/E');

module.exports = (app) => {
    app.get('/api/slides/:topic', (req, res, next) => {
        let { topic } = req.params;
        let rename = `slide_${topic}`;
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
            .then((slide) => res.json(slide))
            .catch((err) => next(err));
    });
    app.get('/api/detail/:id', (req, res, next) => {
        Slide.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
            .exec()
            .then((slide) => res.json(slide))
            .catch((err) => console.log(err));
    });

    app.post('/api/slides', (req, res, next) => {
        const slide = new Slide();

        slide.save()
            .then(() => res.json(slide))
            .catch((err) => next(err));
    });

    app.delete('/api/slides/:id', (req, res, next) => {
        Slide.findOneAndDelete({ _id: req.params.id })
            .exec()
            .then((slide) => res.json(slide))
            .catch((err) => next(err));
    });

    app.put('/api/slides/:id/increment', (req, res, next) => {
        Slide.findById(req.params.id)
            .exec()
            .then((slide) => {
                slide.count++;

                slide.save()
                    .then(() => res.json(slide))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });

    app.put('/api/slides/:id/decrement', (req, res, next) => {
        Slide.findById(req.params.id)
            .exec()
            .then((slide) => {
                slide.count--;

                slide.save()
                    .then(() => res.json(slide))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });
};
