import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import env from 'dotenv';

env.config();
const app = express();
const port = 3000;
const API_URL = process.env.API_URL;  // Correct API URL

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/facts", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const fact = response.data.fact; // Extracting only the fact text
        res.render("facts.ejs", { content: fact });

    } catch (error) {
        console.error(error.message);
        res.render("facts.ejs", { content: "Failed to fetch cat facts. Try again later!" });
    }
});

app.get("/type", async(req, res) => {
    try {
        const animalType = req.query.type  || "cat";
        const response = await axios.get(API_URL);
        const fact = response.data.fact; // Extracting only the fact text
        res.render("facts.ejs", { content: fact });

    } catch (error) {
        console.error(error.message);
        res.render("facts.ejs", { content: "Failed to fetch cat facts. Try again later!" });
    }
});


app.get("/index", async(req, res) => {
    res.redirect("/");
})



app.listen(port, () => {
    console.log(`Server running on port => http://localhost:${port}/`);
});
