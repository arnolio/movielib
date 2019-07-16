module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movie', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 10]
                }
            },
            format: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ['VHS', 'DVD', 'Streaming']
            },
            length: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    max: 500,
                    min: 0
                }
            },
            releaseYear: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    max: 2100,
                    min: 1800
                }
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    max: 5,
                    min: 1
                }
            }
        },
        {
            freezeTableName: true,
        }
    );
};