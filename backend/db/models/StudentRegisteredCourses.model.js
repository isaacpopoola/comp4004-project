/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StudentRegisteredCourses', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Students',
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
    tableName: 'StudentRegisteredCourses',
    schema: 'public',
    timestamps: false
  });
};
