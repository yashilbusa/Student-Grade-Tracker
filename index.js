import express from 'express'
import mongoose from 'mongoose';

const app = express()
const port = 5005

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
  studentName:String,
  subject:String,
  grade:Number
})
const StudentGrade = mongoose.model('StudentGrade',StudentSchema)

app.use(express.json())


