import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = 5050

try {
    await mongoose.connect(process.env.url);
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
      console.log(`Server Running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}

const StudentSchema = new mongoose.Schema({
  id:Number,
  studentName:String,
  subject:[{type:String}],
  grade:Number
})
const Student = mongoose.model('Student',StudentSchema)

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.set('view engine','ejs')

app.get("/",(req,res)=>{
    res.render("detail")
})

app.post("/add-grade",async(req,res)=>{

    // Student.insertOne(
    //     {id:req.body.id,   
    //     studentName:req.body.studentname,
    //     grade:req.body.grade},
    //     { $push: { subject: req.body.subject } } 
    // )

    const data = {
        id: req.body.id,
        studentName: req.body.studentname,
        grade: req.body.grade,
        subject: Array.isArray(req.body.subject) ? req.body.subject : [req.body.subject]
    }

    const studentGrade = new Student(data);
    await studentGrade.save();
    res.render("detail")
})

app.get("/student-summary",async(req,res)=>{

})