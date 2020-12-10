const express = require("express");
const router = express.Router();

const Deliverables = require("../db/models").Deliverables;
const DeliverableGrades = require("../db/models").DeliverableGrades;
const Students = require("../db/models").Students;
const FinalGrades = require("../db/models").FinalGrades;

router.post("", async (req, res) => {
    const username = req.cookies.username;
    const { deliverable_id, submission } = req.body;

    let today = new Date();

    let student = await Students.findOne({ where: { username } });
    let deliverable = await Deliverables.findOne({ where: { id : deliverable_id } });

    if (!student || !deliverable) {
        return res
            .status(400)
            .send({ message: "Student or Deliverable does not exist" });
    } 
    else {
        let correct = submission == deliverable.answer

        // auto grade
        let submission_grade = {
            student_id: student.id,
            course_code: deliverable.course_code,
            deliverable_id: deliverable.id,
            student_submission: submission,
            grade : (correct) ? deliverable.grade_weight : 0,
        };

        // 50% for late submissions
        if (deliverable.due_date && today > deliverable.due_date)
            submission_grade.grade /= 2;

        await DeliverableGrades.create(submission_grade);

        // give final grade after submiting all deliverables
        let total_deliverables = await Deliverables.findAll({
            where: { course_code: deliverable.course_code }
        });

        let submitted = await DeliverableGrades.findAll({
            where: { 
                course_code: deliverable.course_code,
                student_id: student.id,
            }
        });

        if (total_deliverables.length == submitted.length) {
            let total_score = 0;
            let student_score = 0;

            for (i = 0; i < total_deliverables.length; ++i) {
                total_score += total_deliverables[i].grade_weight;
                student_score += submitted[i].grade;
            }

            let final_grade = 100 * Math.floor(student_score / total_score);

            let student_final_grade = {
                student_id: student.id,
                course_code: deliverable.course_code,
                grade: final_grade,
                status: "COMPLETED",
            };

            await FinalGrades.create(student_final_grade);

            return res.status(200).send({ 
                message: "Student has made a submission and completed the course" 
            });
        }
        else {
            return res.status(200).send({ message: "Student has made a submission" });
        }

        
    }
});

module.exports = router;
