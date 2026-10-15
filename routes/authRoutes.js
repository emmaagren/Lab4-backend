const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Registrera en ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Invalid input, send username and password"
            });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
 // Kontrollera om användarnamnet redan finns
 if (error.code === 11000) {
    return res.status(409).json({
        error: "Username already taken"
    });
 }
 res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;