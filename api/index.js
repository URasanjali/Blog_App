import express from "express"
import cors from 'cors';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser";
import multer from "multer";

  
const app = express()
app.use(express.json())
app.use (cookieParser())


app.use(cors({
    origin: 'http://localhost:3000', // The origin of your frontend
    credentials: true, 
}));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../client/public/upload')
    },
    filename: function (req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})

const upload =multer ({storage})

app.post('/api/upload',upload.single('file'), function (req,res){
    const file= req.file
    res.status(200).json(file.filename)
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)




app.listen(8800,()=>{
    console.log("connected!")
})