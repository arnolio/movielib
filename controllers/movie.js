Store = require('yayson')().Store;
store = new Store();

module.exports = (app, db, presenter) => {
    app.get( "/movie", (req, res, next) =>
            db.movie.findAll().then((result) => {
                res.json(presenter.render(result));
            }).catch((err) => next(err))
    );

    app.get( "/movie/:id", (req, res, next) =>
        db.movie.findByPk(req.params.id).then(
            (result) => {
                if (!result) {
                    res.status(404)
                        .send('Not found')
                }
                res.json(presenter.render(result))
            }
        ).catch((err) => next(err))
    );

    app.post("/movie", (req, res, next) => {
            let movie = store.sync(req.body);
            db.movie.create(movie).then(
                (result) => res.json(presenter.render(result))
            ).catch((err) => next(err))
        }
    );

    app.put( "/movie/:id", (req, res, next) => {
            let movie = store.sync(req.body);
            db.movie.update(movie, {
                where: {
                    id: req.params.id
                }
            }).then(
                (result) => res.json(presenter.render(result))
            ).catch((err) => next(err))
        }
    );

    app.delete( "/movie/:id", (req, res, next) =>
        db.movie.destroy({
            where: {
                id: req.params.id
            }
        }).then(
            (result) => res.json(presenter.render(result))
        ).catch((err) => {
            next(err)
        })
    );
};