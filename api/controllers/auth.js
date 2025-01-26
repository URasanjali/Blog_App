import {db} from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";



export const register = (req, res) => {
  // Check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Database query error." });
    }
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [
      req.body.username,
      req.body.email,
      hash,
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database insertion error:", err);
        return res.status(500).json({ message: "Database insertion error." });
      }
      return res.status(200).json("User has been created.");
    });
  });
};

/*
export const register = (req,res)=>{
//chek existing user
const q = "SELECT * FROM users WHERE email =? OR username=?"
db.query(q,[req.body.email,req.body.username], (err,data)=>{
    if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!");

    //hash the password and create a user
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt)

    const q="INSERT INTO users (`username`,`email`,`password`) VALUES (?,?,?)"
    const values = [
        req.body.username,
        req.body.email,
        hash,
    ]
    db.query(q,[values],(err,data)=>{
    if(err) return res.json(err);
    return res.status(200).json("User has been created.")

    })

})

}*/
export const login = (req,res)=>{
    const q = "Select * from users where username = ?"

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
    if(data.length === 0) return res.status(404).json("User not found!");

    //chek password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password)
    if(!isPasswordCorrect) 
        return res.status(400).json("Wrong username or password!")
    const token = jwt.sign({id:data[0].id},"jwtkey");
    const {password, ...other}=data[0]

    res
        .cookie("access_token",token,{
            httpOnly:true,
            //secure: true,
            //sameSite: 'None',
           
        })
        .status(200)
        .json(other);
    })

}
export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        httpOnly:true,
        sameSite:"none",
        secure:true
        //secure: process.env.NODE_ENV === 'production', // Ensure this is set to true in production
        //sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }).status(200).json("User has been logged out.")
}