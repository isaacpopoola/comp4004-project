const express = require("express");
const router = express.Router();

const Professors = require("../db/models").Professors;
const ProffessorAssignedCourses = require("../db/models")
    .ProfessorAssignedCourses;
const Courses = require("../db/models").Courses;
const { Op } = require("sequelize");
const { sequelize } = require("../db/models");
const Students = require("../db/models").Students;
const StudentRegisteredCourses = require("../db/models")
    .StudentRegisteredCourses;
const db = require("../db/models");
const Deliverables = require("../db/models").Deliverables;
const DeliverableGrades = require("../db/models").DeliverableGrades;



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
        price,
        course_time,
        course_day,
        course_duration
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
            price,
            course_time,
            course_day,
            course_duration,
            registered_students: 0,
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
                console.log(`*********************ERROR CODE:${err.parent.code}`);
                if (err.parent.code == 23505){
                    resp.status(400).send({message: `${course_code} already exists`});
                } else {
                    resp.status(500).send({ message: "Error creating course" });
                }
            });
    }
});

router.get("/all", async (req, res) => {
    try {
        const courses = await Courses.findAll({
            where: {},
        });
        return res.status(200).send({ courses });
    } catch {
        return res
            .status(400)
            .send({ message: "error retrieving available courses" });
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

router.get("/me", async (req, res) => {
    try {
        const username = req.cookies.username;
        if (!username)
            return res.status(400).send({ message: "Missing username" });
        const user = await Students.findOne({ where: { username } });
        if (!user)
            return res.status(400).send({ message: "User does not exist" });
        const courses = await StudentRegisteredCourses.findAll({
            raw: true,
            where: { student_id: user.id },
        });

        for(var i = 0; i < courses.length; i++){
            const deliverables = await Deliverables.findAll( { raw: true, where: { course_code: courses[i].course_code} })
           
            if (!deliverables){
                courses[i]["deliverables"] = []
            } else {
                for(var j = 0; j < deliverables.length; j++){
                    const grades = await DeliverableGrades.findOne({
                        raw: true, 
                        where: { student_id: user.id, course_code: courses[i].course_code, deliverable_id: deliverables[j].id},
                        attributes: ["grade"],
                        order: [ [ 'grade', 'DESC' ]],
                    })
                    console.log(grades)
                    deliverables[j]["grade"] = grades == null ? null : grades.grade
                }

                courses[i]["deliverables"] = deliverables;
            }
            
        }

        return res.status(200).send({ courses });
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
