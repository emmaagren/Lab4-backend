require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware för att hantera JSON-data
app.use(express.json());

// Anslut till MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
console.log("Ansluten till MONGODB Atlas");
})
.catch((error) => {
    console.error("Fel vid anslutning till MongoDB:", error.message);
});

// Testa att servern fungerar
app.get("/", (req, res) => {
    res.json({ message: "Lab4 API fungerar!" });
});

// Starta servern
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});