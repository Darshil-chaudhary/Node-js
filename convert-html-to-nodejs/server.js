const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// public folder ni andar raheli static files browser ma serve karva mate
app.use(express.static(path.join(__dirname, "public")));

// Server start karo
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
