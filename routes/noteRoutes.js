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

// Skyddad route för att skapa en ny anteckning
router.post("/notes", authenticateToken, async (req, res) => {
    try {
        
        // Hämta rubrik och innehåll från förfrågan
        const { title, content } = req.body;

        // Kontrollera att båda fälten är ifyllda
        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                error: "Rubrik och innehåll måste anges."
            });
        }

        // Skapa en anteckning för den inloggade användaren
        const note = new Note({
            title: title.trim(),
            content: content.trim(),
            userId: req.user.userId
        });

        // Spara anteckningen i MongoDB
        await note.save();

        // Skicka tillbaka den skapade anteckningen
        res.status(201).json(note);

    } catch (error) {
        console.error("Fel vid skapande av anteckning:", error.message);

        res.status(500).json({
            error: "Kunde inte skapa anteckningen."
        });
    }
});

module.exports = router;