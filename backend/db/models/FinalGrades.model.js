/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FinalGrades', {
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
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("COMPLETED","WITHDRAWN","SAT","UNSAT"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FinalGrades',
    schema: 'public',
    timestamps: false
  });
};
