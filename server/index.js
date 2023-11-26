const express = require("express")
const cors = require("cors");
const mongoose =require("mongoose")
const userRoute = require("./Routes/userRoute")

const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors());
app.use("/api/users",userRoute)

app.get("/" , (req,res)=>{
    res.send("Welcome our chat app")
})

const port = 5000;
const uri = process.env.ATLAS_URI;

app.listen(port , (req,res) => {
    console.log(`server running on port... ${port}`);
})

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=> console.log("MongoDB connection establish")).catch(error=> console.log("MongoDb Connection failed : *", error.message))