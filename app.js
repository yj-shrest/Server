require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const { db } = require("./db/firebase");
const {authRouter} = require("./routes/auth");

const {stockRouter} = require("./routes/stocks")

app.use(express.json());

app.use(cors("*"))
app.get("/greet",(req,res)=>res.send("Hello"));
app.use("/", authRouter);
app.use("/", stockRouter);

app.listen(10000,'0.0.0.0', ()=>{
    console.log("Server listening on port 10000")
})