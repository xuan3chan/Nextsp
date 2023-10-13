import React, { useEffect, useState } from 'react'
import axios from "axios";
const BlogSection = () => {

  const [blogCardProp, setBlogCardProp] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/Blog')
      .then(res => {
        setBlogCardProp(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center py-10">Blog</h1>
      <div className="w-full flex flex-wrap justify-center">
        {blogCardProp.map((item, index) => {
          return (
            <div className="w-[300px] h-[300px] bg-white rounded-xl shadow-md m-5">
              <img className="w-full h-[200px] object-cover rounded-t-xl" src={item.PostImg} alt={item.PostImg} />
              <div className="p-5">
                <p className="text-sm font-semibold">{item.PostTime}</p>
                <p className="text-sm font-semibold">{item.PostName}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default BlogSection