/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProfessorAssignedCourses', {
    prof_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Professors',
        key: 'id'
      }
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Courses',
        key: 'course_code'
      }
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ProfessorAssignedCourses',
    schema: 'public',
    timestamps: false
  });
};
