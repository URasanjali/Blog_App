/*import React , { useState }from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [inputs, setInputs]=useState({
      username:"",
      password:"",
    })
  
  const[err,setError] = useState(null)
  const navigate = useNavigate()
   
  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    try{
    await axios.post("http://localhost:8800/api/auth/login",inputs)
    navigate("/");
  }catch(err){
    setError(err.response.data)
  }
  
  
return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input required type ="text" placeholder='username' name="username" onChange={handleChange}/>
            <input required type ="password" placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span> Don't you have an account?<Link to="/register">Register</Link>
            </span>
        </form>
        </div>
  )
}
}
export default Login*/


import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import blog from '../img/blog.webp'
//import { AuthContext } from '../context/authContext';


const Login = () => {
  const[inputs,setInputs] = useState({
    username:"",
    password:"",
  })
  const [err, setError ] = useState(null)


const navigate = useNavigate()
//const {login}=useContext(AuthContext);

const{login}=useContext(AuthContext)


const handlechange = e=>{
  setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handleSubmit = async e =>{
  e.preventDefault();
  try{
      await login(inputs)
     //await axios.post("http://localhost:8800/api/auth/login",inputs, { withCredentials: true })
     navigate("/");
    //console.log(res)
  }catch(err){
   // console.log(err)
   setError(err.response.data);
  }
  
}

  return (
    <div className='auth'>
      <div className='img'/>
      <img src= {blog} alt=""/>
      <div className='main'>
        <h1>Login</h1> 
        <form>
          <input type='text' placeholder='username' name="username" onChange={handlechange}/>
          <input type="password" placeholder='password' name='password' onChange={handlechange}/>
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
          <span>
            Don't you have an account?<Link to="/register">Create an account</Link>

          </span>
        </form>
     </div>
    </div>
  )
}

export default Login;