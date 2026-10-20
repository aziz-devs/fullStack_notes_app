// this is the main file of the backend server , which is responsible for handling the requests and responses from the client side.
const express = require("express");
const notesRouter = require("./routes/routes");
const mongoose = require("mongoose");
const rateLimit = require("./middleware/ratelimit");
const cors = require("cors");
const path = require("path");
// concat the path of the database connection file and the config folder
const { connecteDB } = require("./config/db");
// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// . Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
const dotenv = require("dotenv");
// call the config method of the dotenv module to load the environment variables from the .env file into process.env
dotenv.config();
// calling the port variable from the .env file and storing it in a constant variable
const Port=process.env.Port



const app = express();
// const __dirname = path.resolve();



// ? this is the middleware for parsing the json data ,
if(process.env.NODE_ENV !== "production"){ 
app.use(cors({

    origin: "http://localhost:5173", // Replace with your frontend URL
}));

}
app.use(express.json());

app.use(rateLimit);

app.use("/api/notes", notesRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
    } )}

connecteDB().then(() => {
 
    // ! this is the server port , listening to the port 5000
    app.listen(Port, () => console.log("server is listing in port ",Port))
})

