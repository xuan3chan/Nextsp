import React from 'react'
import { Navigate } from "react-router-dom";
const Landing = () => {
  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Congragulation!!!</h1>
          <h4>Chúc Mừng Mày Đã Đăng Nhập Thành Công</h4>
          <div className='buttons'>
            <a href='/register' className='btn btn-primary'>Register</a>
            <a href='/login' className='btn btn-light'>Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing