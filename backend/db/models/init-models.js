var DataTypes = require("sequelize").DataTypes;
var _Administrators = require("./Administrators.model");
var _Courses = require("./Courses.model");
var _DeliverableGrades = require("./DeliverableGrades.model");
var _Deliverables = require("./Deliverables.model");
var _FinalGrades = require("./FinalGrades.model");
var _ProfessorAssignedCourses = require("./ProfessorAssignedCourses.model");
var _Professors = require("./Professors.model");
var _StudentRegisteredCourses = require("./StudentRegisteredCourses.model");
var _Students = require("./Students.model");

function initModels(sequelize) {
  var Administrators = _Administrators(sequelize, DataTypes);
  var Courses = _Courses(sequelize, DataTypes);
  var DeliverableGrades = _DeliverableGrades(sequelize, DataTypes);
  var Deliverables = _Deliverables(sequelize, DataTypes);
  var FinalGrades = _FinalGrades(sequelize, DataTypes);
  var ProfessorAssignedCourses = _ProfessorAssignedCourses(sequelize, DataTypes);
  var Professors = _Professors(sequelize, DataTypes);
  var StudentRegisteredCourses = _StudentRegisteredCourses(sequelize, DataTypes);
  var Students = _Students(sequelize, DataTypes);

  DeliverableGrades.belongsTo(Courses, { foreignKey: "course_code"});
  Courses.hasMany(DeliverableGrades, { foreignKey: "course_code"});
  DeliverableGrades.belongsTo(Deliverables, { foreignKey: "deliverable_id"});
  Deliverables.hasMany(DeliverableGrades, { foreignKey: "deliverable_id"});
  DeliverableGrades.belongsTo(Students, { foreignKey: "student_id"});
  Students.hasMany(DeliverableGrades, { foreignKey: "student_id"});
  Deliverables.belongsTo(Courses, { foreignKey: "course_code"});
  Courses.hasMany(Deliverables, { foreignKey: "course_code"});
  FinalGrades.belongsTo(Courses, { foreignKey: "course_code"});
  Courses.hasMany(FinalGrades, { foreignKey: "course_code"});
  FinalGrades.belongsTo(Students, { foreignKey: "student_id"});
  Students.hasMany(FinalGrades, { foreignKey: "student_id"});
  ProfessorAssignedCourses.belongsTo(Courses, { foreignKey: "course_code"});
  Courses.hasMany(ProfessorAssignedCourses, { foreignKey: "course_code"});
  ProfessorAssignedCourses.belongsTo(Professors, { foreignKey: "prof_id"});
  Professors.hasMany(ProfessorAssignedCourses, { foreignKey: "prof_id"});
  StudentRegisteredCourses.belongsTo(Courses, { foreignKey: "course_code"});
  Courses.hasMany(StudentRegisteredCourses, { foreignKey: "course_code"});
  StudentRegisteredCourses.belongsTo(Students, { foreignKey: "student_id"});
  Students.hasMany(StudentRegisteredCourses, { foreignKey: "student_id"});

  return {
    Administrators,
    Courses,
    DeliverableGrades,
    Deliverables,
    FinalGrades,
    ProfessorAssignedCourses,
    Professors,
    StudentRegisteredCourses,
    Students,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
