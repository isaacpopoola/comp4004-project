/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "Deliverables",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            course_code: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "Courses",
                    key: "course_code",
                },
            },
            grade_weight: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "Deliverables",
            schema: "public",
            timestamps: false,
            indexes: [
                {
                    name: "Deliverables_pkey",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
