import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../actions/sharedActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
      
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  const{ user } = userInfo

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getCourses())
    }
  }, [history, userInfo, dispatch])

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  return (
    <div className='container'>    
      <div className='card card-body'>
        <h4>Hello {user.name},</h4>
        <p>Welcome back</p>
      </div>
      
      <h5 className='my-2'>My Courses</h5>

      <div className='m-2'>
        {loading && <Loader />}
      </div>

      <div className='m-2'>
        {error && 
        <Message variant='danger'>{error}</Message>}
      </div>


    
      {loading ===false && courses?.length > 0 && (
        <>
          {courses.map((course) => (
            <LinkContainer to={`/courses/${course.course_id}`} key={course.course_id}>          
              <div className='card card-body my-2'>
                <h6>{course.title}</h6>
              <p>{course.description}</p>
              </div>
            </LinkContainer>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;