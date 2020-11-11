module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
    });

    return Student;
};
