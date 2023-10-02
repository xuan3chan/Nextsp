import React from 'react'
import {Register}  from '../components'
import {LoginForm} from '../components/auth/LoginForm'
const Auth = ({authRoute}) => {

  let body
  body = (
    <>
      Learit
      {authRoute === 'login' && <LoginForm/>}
      {authRoute === 'register' && <Register/>}
    </>
  )
  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>LearnIT</h1>
        </div>
      </div>
    </div>
  )
}
export default Auth
