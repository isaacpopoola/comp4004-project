"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Students = require("./Students.model")(sequelize, Sequelize);
db.Professors = require("../models/Professors.model")(sequelize, Sequelize);
db.Deliverables = require("../models/Deliverables.model")(sequelize, Sequelize);
db.Administrators = require("../models/Administrators.model")(sequelize, Sequelize);
db.Courses = require("../models/Courses.model")(sequelize, Sequelize);
db.DeliverableGrades = require("../models/DeliverableGrades.model")(sequelize, Sequelize);
db.FinalGrades = require("./FinalGrades.model")(sequelize, Sequelize);
db.ProfessorAssignedCourses = require("./ProfessorAssignedCourses.model")(sequelize,Sequelize);
db.StudentRegisteredCourses = require("./StudentRegisteredCourses.model")(sequelize,Sequelize);






module.exports = db;
