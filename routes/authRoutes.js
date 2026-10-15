const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kontrollera att användarnamn och lösenord finns
        if (!username || !password) {
            return res.status(400).json({
                error: "Ange användarnamn och lösenord"
            });
        }

        // Hitta användaren i databasen
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                error: "Felaktigt användarnamn eller lösenord."
            });
        }

        // Jämför lösenordet med den sparade hashen
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                error: "Felaktigt användarnamn eller lösenord"
            });
        }

        // Skapa en JWT-token som gäller i en timme
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Skicka token till klienten
        res.json({
            message: "Inloggningen lyckades",
            token: token
        });

    } catch (error) {
        console.error("Fel vid inloggning:", error.message);
        res.status(500).json({error: "Serverfel" });
    }
});

module.exports = router;