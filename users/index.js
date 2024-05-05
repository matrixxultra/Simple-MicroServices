const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/store"
const User = require("./User")
const jwt  = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())
mongoose.connect(url).then(()=>console.log("Connected")).catch(e=>console.log("Not Connected" , e))
app.listen(6000,()=>console.log("Starts in 6000"))
// Login
app.post("/login",async (req,res)=>{
    const {name ,email, pass} = req.body
    const student = await User.find({email})
   
   
   if (!student) {
        return res.status(405).json({message : "Student Already Exist In Our DataBase"})
    }
    bcrypt.compare(pass , student.pass).then(r=>{
        if (!r) {
            return res.json({message : "Password Incorrect"})
        }
        const accessToken = jwt.sign(student,"idrisswa3r")
        res.json({accessToken : accessToken}).status(201)
    })
})
// Inscrir Student
app.post("/register",async(req,res)=>{
    const {name ,email, pass} = req.body
    const student = User.findOne({email})
    if (!student) {
        return res.status(405).json({message : "Student Already Exist In Our DataBase"})
    }
    const hashed = await bcrypt.hash(pass,10)
   
    User.create( { name, email , pass:hashed}).then(()=>res.send("Student Created with Success"))



})