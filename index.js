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
  subject:String,
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

    const data = {
        id: req.body.id,
        studentName: req.body.studentname,
        subject: req.body.subject,
        grade: req.body.grade
    }

    const studentGrade = new Student(data);
    await studentGrade.save();
    res.render("detail")
})

app.get("/student-summary",async(req,res)=>{
    const student = await Student.find();
    res.send(student)
})

app.use()