const imdb = new (require('omdbapi'))(process.env.IMDB_API_KEY);
Store = require('yayson')().Store;
store = new Store();

module.exports = (app, db, presenter) => {
    app.get( "/movie", (req, res, next) => {
        let condition = !req.query.sort ? {} : { order: getSortArray(req.query.sort) } ;
        db.movie.findAll(condition).then((result) => {
            res.json(presenter.render(result));
        }).catch(err => next(err))
    });

    app.get( "/movie/:id", getMovie, (req, res) =>
        res.json(presenter.render(req.movie))
    );

    app.post("/movie", searchIMDB,(req, res, next) => {
            let payload = getPayload(req.body);
            db.movie.create(payload).then(
                (result) => res.json(presenter.render(result))
            ).catch(err => next(err))
        }
    );

    app.put( "/movie/:id", getMovie, (req, res, next) => {
        let payload = getPayload(req.body);
        req.movie.update(payload)
            .then((self) => res.json(presenter.render(self)))
            .catch(err => next(err));
        }
    );

    app.delete( "/movie/:id", (req, res, next) =>
        db.movie.destroy({
            where: {
                id: req.params.id
            }
        }).then(
            () => res.status(204)
        ).catch(err => next(err))
    );

    app.use(function(error, req, res, next) {
        if (res.headersSent) {
            return next(error)
        }
        res.status(500).json({ error: error.toString() });
    });

    function getSortArray(sortString) {
        let sortArray = [], descending;
        sortString.split(",").forEach((sortColumn) => {
            descending = sortColumn.charAt(0) === '-';
            sortArray.push([
                (descending ? sortColumn.slice(1) : sortColumn),
                (descending ? 'DESC' : 'ASC')
            ])
        });
        return sortArray;
    }

    function getMovie(req, res, next) {
        db.movie.findByPk(req.params.id).then((result) => {
            if (!result) {
                res.status(404)
                    .send('Movie Not Found')
            }
            req.movie = result;
            next();
        })
    }

    function searchIMDB(req, res, next) {
        if (!req.body.data.attributes.imdbId) {
            next();
        }

        imdb.get({
            id: req.body.data.attributes.imdbId,
        }).then(res => {
            req.body.data.attributes.title = res.title;
            req.body.data.attributes.length = parseInt(res.runtime) || req.body.data.attributes.length;
            req.body.data.attributes.releaseYear = res.year;
            next();
        }).catch((err => next(err)));
    }

    function getPayload(body) {
        let payload = store.sync(body);
        delete payload.createdAt;
        delete payload.updatedAt;
        delete payload.type;
        delete payload.id;

        return payload;
    }
};