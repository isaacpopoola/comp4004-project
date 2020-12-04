/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DeliverableGrades', {
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
    deliverable_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Deliverables',
        key: 'id'
      }
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    student_submission: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DeliverableGrades',
    schema: 'public',
    timestamps: false
  });
};
