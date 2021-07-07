const SlideComment = require('../../models/SlideComment');
const E = require('../../models/entity/E');

module.exports = (app) => {
    app.get('/api/slideComments/:id/:page', (req, res, next) => {
        SlideComment.findOne({ slide_id: req.params.id, page: req.params.page })
            .exec()
            .then((slideComment) => res.json(slideComment))
            .catch((err) => next(err));
    });

    app.post('/api/slideComments', (req, res, next) => {
        let data = req.body;
        const message = new E.Message().init();
        message.content = data.content;
        message.user_id = 1;
        console.log('data', data);
        SlideComment.findOne({ slide_id: data.slide_id, page: data.page }).exec().then((r) => {
            console.log('rr', r);
            if (r !== null) {
                r.messages.push(message);
                r.page = data.page;
                r.save();
                res.json({ code: 0 });
            } else {
                let slideComment = new SlideComment();
                slideComment.slide_id = data.slide_id;
                slideComment.page = data.page;
                slideComment.messages.push(message);
                slideComment.save();
            }
        });
    });

    app.delete('/api/slideComments/:id', (req, res, next) => {
        SlideComment.findOneAndDelete({ _id: req.params.id })
            .exec()
            .then((slideComment) => res.json())
            .catch((err) => next(err));
    });
};
