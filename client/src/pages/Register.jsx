import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import blog from '../img/blog.webp'

const Register = () => {
  const [inputs, setInputs]=useState({
    username:"",
    email:"",
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
  await axios.post("http://localhost:8800/api/auth/register",inputs)
  navigate("/login");
}catch(err){
  setError(err.response.data)
}
}
  return (
    <div className='auth'>
      <div className='img'/>
      <img src= {blog} alt=""/>
      <div className='main'>
        <h1>Register</h1>
        <form>
            <input required type ="text" placeholder='username' name='username' onChange={handleChange}/>
            <input required type ="email" placeholder='email' name='email' onChange={handleChange}/>
            <input required type ="password" placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span> Do you have an account?<Link to="/login">Login</Link>
            </span>
        </form>
      </div>
    </div>
  )
}

export default Register