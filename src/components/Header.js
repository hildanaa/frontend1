import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import '../css/header.css'


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
    window.location.reload();
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container-fluid ">
          <a className="navbar-brand " href="#">LMS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
              </li>
              {userInfo ? <>
                <li className='nav-item'>
                  <Link to='/dashboard' className='nav-link'>
                    My Courses
                  </Link>
                </li>
                <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  {userInfo.user.name}
                </Link>
                </li>
                <li className='nav-item'>
                  <div onClick={logoutHandler} className='nav-link'>
                    <i className="fas fa-sign-out-alt fa-lg"></i>
                  </div>
                </li>
                
                
                
              </> : <>
               <li>
                <Link to='/login' className='nav-link'>
                    <i className="fas fa-sign-in-alt fa-lg"></i> Sign In
                  </Link>
               </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
      {/* <Link to='/' className=''>
        <img
          src='/lms.png'
          className='logo'
          alt='LMS'
        />
      </Link>
      <nav className="user-nav">
        {userInfo ? <>
          <Link to='/order' className='user-nav__user'>
            My Orders
          </Link>
          <Link to='/profile' className='user-nav__user'>
            {userInfo.user.name}
          </Link>
          <div onClick={logoutHandler} className='user-nav__user'>
            <i className="fas fa-sign-out-alt fa-lg"></i>
          </div>
        </>  : <>         
          <Link to='/login' className='user-nav__icon-box m-1'>
            <i className="fas fa-sign-in-alt fa-lg"></i> Sign In 
          </Link>
        </>}
        
    </nav> */}
    </>
  )
}

export default Header
