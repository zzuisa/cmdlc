const SlideComment = require('../../models/SlideComment');
const E = require('../../models/entity/E');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');

let R = new T();
module.exports = (app) => {
    app.get('/api/slideComments/:id/:page', (req, res, next) => {
        SlideComment.findOne({ slide_id: req.params.id, page: req.params.page })
            .exec()
            .then((slideComment) => res.json(R.ok(slideComment)))
            .catch((err) => res.json(R.error()));
    });

    app.post('/api/slideComments', (req, res, next) => {
        let data = req.body;
        const message = new E.Message().init();
        message.content = data.content;
        message.user_id = 1;
        SlideComment.findOne({ slide_id: data.slide_id, page: data.page }).exec().then((r) => {
            if (r !== null) {
                r.messages.push(message);
                r.page = data.page;
                r.save();
                res.json(R.ok());
            } else {
                let slideComment = new SlideComment();
                slideComment.slide_id = data.slide_id;
                slideComment.page = data.page;
                slideComment.messages.push(message);
                slideComment.save();
            }
        });
    });
};
