const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const authenticateToken = require("../middleware/auth");

// Skyddad route för att hämta användarens anteckningar
router.get("/notes", authenticateToken, async (req, res) => {
    try {
        // Hämta endast den inloggade användarens anteckningar
        const notes = await Note.find({
            userId: req.user.userId
        });

        // Skicka tillbaka anteckningarna som JSON
        res.json(notes);

    } catch (error) {
        console.error("Fel vid hämtning av anteckningar:", error.message);

        res.status(500).json({
            error: "Kunde inte hämta anteckningarna."
        });
    }
});

module.exports = router;