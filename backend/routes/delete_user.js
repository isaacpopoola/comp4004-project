const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Professors = require("../db/models").Professors
const DeliverableGrades = require("../db/models").DeliverableGrades
const FinalGrade = require("../db/models").FinalGrades
const ProfessorAssignedCourses = require("../db/models").ProfessorAssignedCourses


router.post("/delete", async (req, res) => {
    const { username, type } = req.query;

    switch (type){
        case "Student":
            const delStudent = Students.findAll({
                where: {
                  username: username,
                  type: type
                }
            });

            DeliverableGrades.destroy({
                where: {
                    id: delStudent.id
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error deleting student" });
            });

            FinalGrade.destroy({
                where: {
                    id: delStudent.id
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error deleting student" });
            });

            Students.destroy({
                where: {
                    id: delStudent.id
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error deleting student" });
            });

            res.status(201).send({ message: "Student deleted successfully" })

            break;
        case "Professor":
            const delProf = Professors.findAll({
                where: {
                    id: id,
                    username: username,
                    type: type
                }
            });

            ProfessorAssignedCourses.destroy({
                where: {
                    id: delProf.id
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error deleting professor" });
            });

            Professors.destroy({
                where: {
                    id: delProf.id
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error deleting professor" });
            });

            res.status(201).send({ message: "Professor deleted successfully" })
        
            break;

        default:
            res.status(400).send({message: "Please use a valid User type (Student or Professor)"})
    }

});

module.exports = router;
