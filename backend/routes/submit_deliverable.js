const express = require("express");
const router = express.Router();

const Deliverables = require("../db/models").Deliverables;
const DeliverableGrades = require("../db/models").DeliverableGrades;
const Students = require("../db/models").Students;

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

        return res
                .status(200)
                .send({ message: "Student has made a submission" });
    }
});

module.exports = router;
