/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "Courses",
        {
            course_code: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            course_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            course_descr: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            course_registration_deadline: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            course_drop_deadline: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            course_student_limit: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            registered_students: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            course_credits: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            course_time: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            course_duration: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            course_day: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            prereqs: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
        },
        {
            sequelize,
            tableName: "Courses",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "Courses_pkey",
                    unique: true,
                    fields: [{ name: "course_code" }],
                },
            ],
        }
    );
};
