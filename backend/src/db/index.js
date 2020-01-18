const { DataTypes, Sequelize, Op } = require('sequelize');
const path = require('path');

module.exports.createStore = () => {
    const operatorsAliases = {
        $in: Op.in,
    };

    console.log(path.resolve(__dirname, '../../store.sqlite'));

    const sequelize = new Sequelize(
        process.env.DATABASE,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
            dialect: 'sqlite',
            storage: path.resolve(__dirname, '../../store.sqlite'),
            operatorsAliases,
        }
    );

    const todos = sequelize.define(
        'Todo',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            task: DataTypes.TEXT,
            isComplete: DataTypes.BOOLEAN,
        },
        {
            tableName: 'Todos',
            timestamps: false,
        }
    );

    sequelize.sync();

    return {
        todos,
    };
};
