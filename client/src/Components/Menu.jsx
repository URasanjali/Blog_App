 
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Menu=({cat}) => {

  const [posts,setPosts] = useState([])
  

  console.log(location)

  useEffect(() =>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();

    },[cat])
    // const posts = [
    //     {
    //       id:1,
    //       title:"Balance Meal of Healthy Food",
    //       desc:" A balanced meal typically includes a lean protein source like grilled chicken or tofu, paired with a variety of colorful vegetables such as broccoli, bell peppers, and spinach, providing essential vitamins and minerals. Whole grains like quinoa or brown rice offer complex carbohydrates for sustained energy, while healthy fats from sources like avocado or nuts add flavor and satiety. Incorporating fruits like berries or oranges provides natural sweetness and additional fiber. Finally, hydration is key, so water or herbal tea complements the meal. This combination ensures a nourishing and satisfying plate for optimal health and well-being.",
    //       img:"https://cdn.aarp.net/content/dam/aarp/health/caregiving/2018/03/1140-nutrients-food-loved-ones-caregiving.jpg",
    //     },
    
    //     {
    //       id:2,
    //       title:"bb",
    //       desc:" bbb",
    //       img:"https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //     },
    //     {
    //       id:3,
    //       title:"cc",
    //       desc:" cccccccccc cc ccc ccc ccc cc ccc cc cc cc ccc ccc ccccccc",
    //       img:"https://st3.depositphotos.com/1005145/15351/i/450/depositphotos_153516954-stock-photo-summer-landscape-with-flowers-in.jpg",
    //     },
    
    // ];

    
  return (
    <div className="menu">
        <h1>Other post you may like</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={`../upload/${post?.img}`} alt=''/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
        
    </div>
  )
}

export default Menu