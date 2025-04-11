const express = require("express");
const app = express();
const aiRoute = require("./routes/ai.routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.get("/", (req,res)=>{
    res.send("Hello World!")
});

app.use("/ai", aiRoute);

module.exports = app;