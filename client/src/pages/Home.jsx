import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';


const Home = () => {
  const [posts,setPosts] = useState([])
  const cat = useLocation().search

  console.log(location)

  useEffect(() =>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();

    },[cat])
   /* const posts = [
    {
      id:1,
      title:"Balance Meal of Healthy Food",
      desc:" A balanced meal typically includes a lean protein source like grilled chicken or tofu, paired with a variety of colorful vegetables such as broccoli, bell peppers, and spinach, providing essential vitamins and minerals. Whole grains like quinoa or brown rice offer complex carbohydrates for sustained energy, while healthy fats from sources like avocado or nuts add flavor and satiety. Incorporating fruits like berries or oranges provides natural sweetness and additional fiber. Finally, hydration is key, so water or herbal tea complements the meal. This combination ensures a nourishing and satisfying plate for optimal health and well-being.",
      img:"https://cdn.aarp.net/content/dam/aarp/health/caregiving/2018/03/1140-nutrients-food-loved-ones-caregiving.jpg",
    },

    {
      id:2,
      title:"bb",
      desc:" bbb",
      img:"https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id:3,
      title:"cc",
      desc:" cccccccccc cc ccc ccc ccc cc ccc cc cc cc ccc ccc ccccccc",
      img:" ",
    },

  ];*/

  const getText =(html) =>{
    const doc =new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./upload/${post.img}`} alt=""/>
              
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home