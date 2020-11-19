const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Administrators = require("../db/models").Administrators;

router.post("", async (req, res) => {
    const { username, password, type } = req.body;

    if (!username || !password || !type)
        res.status(400).send({
            message: "Missing username, password, or type",
        });

    let user;

    switch (type) {
        case "Student":
            user = await Students.findOne({ where: { username } });
            break;
        case "Administrator":
            user = await Administrators.findOne({ where: { username } });
            break;
    }

    if (!user) res.status(400).send({ message: "User does not exist" });
    else {
        if (password === user.password) {
            res.status(200).send({ id: user.id, type });
        } else {
            res.status(400).send({ message: "Incorrect password" });
        }
    }
});

module.exports = router;
