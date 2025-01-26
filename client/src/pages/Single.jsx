import React, { useContext } from 'react'
import Menu from '../Components/Menu'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import moment from 'moment/moment'


const Single = () => {
  const [post,setPost] = useState({})
  const location = useLocation()
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2]
  const{currentUser} = useContext(AuthContext)

  //console.log(location)

  useEffect(() =>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}` )
        setPost(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();

    },[postId])

  const handleDelete = async ()=>{
    try{
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, { withCredentials: true })
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  const getText =(html) =>{
    const doc =new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className="single">
      <div className="content">
        <img src= {`../upload/${post?.img}`}/>
'     <div className="user">
        {post.userImg && <img src={post.userImg}/>}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
       


        {currentUser.username === post.username && <div className="edit">
          <Link to={'/write?edit=2'} state={post}>
          <img src={Edit} alt=""/>
          
          </Link>
          <img onClick={handleDelete} src={Delete} alt=""/>
          
        </div>}
      </div>
      <h1>{post.title}</h1>
      <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single