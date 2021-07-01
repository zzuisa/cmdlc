const Slide = require('../../models/Slide');

module.exports = (app) => {
    app.get('/api/slides/:topic', (req, res, next) => {
        Slide.find({ topic: req.params.topic })
            .exec()
            .then((slide) => res.json(slide))
            .catch((err) => next(err));
    });
    app.get('/api/detail/:id', (req, res, next) => {
        Slide.findById(req.params.id)
            .exec()
            .then((slide) => res.json(slide))
            .catch((err) => next(err));
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
            .then((slide) => res.json())
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
