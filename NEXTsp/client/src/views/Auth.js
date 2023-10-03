import React from 'react'
import {LoginForm} from '../components/auth/LoginForm'
const Auth = () => {
  

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>LearnIT</h1>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}
export default Auth
