module.exports = (app, db, presenter) => {
    app.get( "/movie", (req, res) =>
        db.movie.findAll().then( (result) => {
            res.json(presenter.render(result));
        } )
    );

    app.get( "/movie/:id", (req, res) =>
        db.movie.findByPk(req.params.id).then( (result) => res.json(presenter.render(result)))
    );

    app.post("/movie", (req, res) => {
            console.log(req.body.data);
            db.movie.create({
                title: req.body.data.attributes.title,
                format: req.body.data.attributes.format,
                length: req.body.data.attributes.length,
                releaseYear: req.body.data.attributes.releaseYear,
                rating: req.body.data.attributes.rating
            }).then((result) => res.json(presenter.render(result)))
        }
    );

    app.put( "/movie/:id", (req, res) =>
        db.movie.update({
                title: req.body.data.attributes.title,
                format: req.body.data.attributes.format,
                length: req.body.data.attributes.length,
                releaseYear: req.body.data.attributes.releaseYear,
                rating: req.body.data.attributes.rating
            }, {
                where: {
                    id: req.params.id
                }
            }).then( (result) => res.json(presenter.render(result)) )
    );

    app.delete( "/movie/:id", (req, res) =>
        db.movie.destroy({
            where: {
                id: req.params.id
            }
        }).then( (result) => res.json(presenter.render(result)) )
    );
};