const { Sequelize, Op, DataTypes } = require('sequelize');

const todo = sequelize => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        task: DataTypes.TEXT,
        isComplete: DataTypes.BOOLEAN,
    });

    return Todo;
};

module.exports = todo;
