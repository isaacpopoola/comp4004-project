const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;

router.get("/all", async (req, res) => {
    try {
        const students = await Students.findAll();
        if (students) return res.status(200).send({ students });
    } catch {
        return res.status(400).send({ message: "error retrieving students" });
    }
});

module.exports = router;
