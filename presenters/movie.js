const Presenter = require('yayson')({
    adapter: 'sequelize'
}).Presenter;

class MoviePresenter extends Presenter {};
MoviePresenter.prototype.type = 'movies';

module.exports = MoviePresenter;