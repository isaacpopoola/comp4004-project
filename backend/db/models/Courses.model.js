/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Courses', {
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_descr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_registration_deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    course_drop_deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    course_student_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    course_credits: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Courses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Courses_pkey",
        unique: true,
        fields: [
          { name: "course_code" },
        ]
      },
    ]
  });
};
