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

        //gives final grades if needed
        var course_deliv = await Deliverables.findAll({raw: true, where: { course_code: deliverable.course_code}});
        var completed_deliv = await DeliverableGrades.findAll({raw: true, where: { student_id: student.id, course_code: deliverable.course_code},})
        var finalgrade = 0;

        if (course_deliv.length <= completed_deliv.length){
            for(var i = 0; i < course_deliv.length; i++){
                for(var j = 0; j < completed_deliv.length; j++){
                    if (course_deliv[i].id === completed_deliv[j].deliverable_id){
                        finalgrade += completed_deliv[j].grade * (course_deliv[i].grade_weight/100)
                    }
                }
            }

            await FinalGrades.create({
                student_id: student.id,
                course_code: deliverable.course_code,
                grade: finalgrade,
                status: "COMPLETED"
            })
        }



        return res
                .status(200)
                .send({ message: "Student has made a submission" });
    }
});

module.exports = router;
