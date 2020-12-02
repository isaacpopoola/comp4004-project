const express = require("express");
const router = express.Router();

const Professors = require("../db/models").Professors;
const ProffessorAssignedCourses = require("../db/models")
    .ProfessorAssignedCourses;
const Courses = require("../db/models").Courses;
const { Op } = require("sequelize");
const db = require("../db/models");

router.post("", async (req, resp) => {
    const {
        course_code,
        profId,
        course_name,
        course_descr,
        course_registration_deadline,
        course_drop_deadline,
        course_student_limit,
        course_credits,
        section,
    } = req.body;

    // check if primary and foreign keys are null
    if (!course_code || !course_name || !course_descr || !course_credits) {
        return resp.status(400).send({
            message:
                "Missing course code, course name, course decription or course credit",
        });
    } else if (!profId) {
        return resp.status(400).send({
            message: "Missing proffessor id",
        });
    }
    // check if prof exists
    console.log("check if prof exists");
    let prof = await Professors.findOne({ where: { id: profId } });

    if (!prof) resp.status(400).send({ message: "Professor does not exist" });
    else {
        console.log("Creating Course");
        Courses.create({
            course_code,
            course_name,
            course_descr,
            course_registration_deadline,
            course_drop_deadline,
            course_student_limit,
            course_credits,
        })
            .then((res) => {
                console.log("Assigning Professor to Course");
                ProffessorAssignedCourses.create({
                    course_code,
                    prof_id: profId,
                    section,
                })
                    .then((res) =>
                        resp
                            .status(200)
                            .send({ message: "Successfully created course" })
                    )
                    .catch((err) => {
                        console.log(err);
                        resp.status(500).send({
                            message: "Error assigning professor to course",
                        });
                    });
            })
            .catch((err) => {
                console.log(err);
                resp.status(500).send({ message: "Error creating course" });
            });
    }
});

router.get("/available", async (req, res) => {
    try {
        const courses = await Courses.findAll({
            where: {
                registered_students: {
                    [Op.lt]: db.sequelize.col("course_student_limit"),
                },
            },
        });
        return res.status(200).send({ courses });
    } catch {
        return res
            .status(400)
            .send({ message: "error retrieving available courses" });
    }
});

// router.delete("", (req, res) => {
//     const { course_code, course_name } = req.body;

// });

module.exports = router;
