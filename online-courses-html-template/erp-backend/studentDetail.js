const express=require('express')
const mongoose=require('mongoose')

const path=require('path')
const port=3019
const app=express();
//app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/studentDetail')
const db=mongoose.connection

db.once('open',()=>{
    console.log("mongodb connection successful")
});

const studentSchema = new mongoose.Schema({
    studentName: String,
    rollNo: Number,
    dob: Date ,
    fatherName: String,
    motherName: String,
    aadharCard: String,
    achievements: String
    
});

const Student = mongoose.model('Student', studentSchema);

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'teacherstudentsdetail.html'),(err) => {
        if(err){
            console.error('Error serving HTML file:',err);
            res.status(500).send('Error loading page');
        }
    });
});

app.post('/post',async(req, res) => {
    try{
        const { studentName, rollNo, dob, fatherName, motherName, aadharCard, achievements } = req.body;
        console.log("Request body:",req.body);
        const newStudent = new Student({
            studentName,
            rollNo,
            dob,
            fatherName,
            motherName,
            aadharCard,
            achievements
        });
        await newStudent.save();
        console.log(newStudent);
        res.send('Saved Student Details');
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error Student Details');
    }
});
app.listen(port,()=>{
    console.log("server started");
})

