import { COURSES_LIST_FAIL, COURSES_LIST_REQUEST, COURSES_LIST_SUCCESS, COURSE_DETAIL_FAIL, COURSE_DETAIL_REQUEST, COURSE_DETAIL_SUCCESS } from '../constants/sharedConstants'
import axios from 'axios'
import { BASE_URL } from '../constants/global'


export const getCourses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSES_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${BASE_URL}/api/courses`, config)
 
    dispatch({
      type: COURSES_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: COURSES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }

}

export const getCourseDetail = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DETAIL_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${BASE_URL}/api/courses/${courseId}`, config)
    
      dispatch({
        type: COURSE_DETAIL_SUCCESS,
        payload: data,
      })
  } catch (error) {
    dispatch({
      type: COURSE_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



