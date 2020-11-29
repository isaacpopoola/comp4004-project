const express = require("express");
const router = express.Router();

const Students = require("../db/models").Students;
const Administrators = require("../db/models").Administrators;

router.post("", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).send({
            message: "Missing username, password, or type",
        });

    var  user = await Students.findOne({ where: { username } });;
    var type = "Student"
    if (!user) {
        user = await Administrators.findOne({ where: { username } });
        type = "Admin"
    }

    // console.log(user);

    // switch (type) {
    //     case "Student":
    //         user = await Students.findOne({ where: { username } });
    //         break;
    //     case "Administrator":
    //         user = await Administrators.findOne({ where: { username } });
    //         break;
    // }

    if (!user) return res.status(400).send({ message: "User does not exist" });
    else {
        if (password === user.password) {
            return res.status(200).send({ id: user.id, type });
        } else {
            return res.status(400).send({ message: "Incorrect password" });
        }
    }
});

module.exports = router;
