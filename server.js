const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Testroute
app.get("/", (req, res) => {
    res.json({ message: "Lab4 API fungerar!" });
});

// Starta servern
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});