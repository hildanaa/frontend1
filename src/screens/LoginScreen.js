import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

function LoginScreen({ history, location }) {
  const navigate = useNavigate()
  // const location = useLocation()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const redirect = location ? location.search.split('=')[1] : '/dashboard'

  useEffect(() => {
    
    if (userInfo) {
      const { user } = userInfo
      if (user) {
        navigate(redirect)
      }
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(email === '' || password === '') {
      alert('Please fill out all the fields')
    }
    dispatch(login(email, password))
  }

  return (
   <div>
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            className={`form-control my-1`}
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={`form-control my-1`}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn btn-dark my-2'>Sign In</button>
        
      </form>
    </FormContainer>
   </div>
  )
}

export default LoginScreen
