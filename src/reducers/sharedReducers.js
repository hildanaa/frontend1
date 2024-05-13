import { COURSES_LIST_FAIL, COURSES_LIST_REQUEST, COURSES_LIST_SUCCESS, COURSE_DETAIL_FAIL, COURSE_DETAIL_REQUEST, COURSE_DETAIL_SUCCESS } from '../constants/sharedConstants'

export const CoursesListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSES_LIST_REQUEST:
      return { ...state, loading: true }
    case COURSES_LIST_SUCCESS:
      return { loading: false, courses: action.payload }
    case COURSES_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseDetailReducer = (state = {course: {}}, action) => {
  switch(action.type) {
    case COURSE_DETAIL_REQUEST:
      return {...state, loading: true, success: false}
    case COURSE_DETAIL_SUCCESS:
      return {loading: false, success: true, course: action.payload}
    case COURSE_DETAIL_FAIL:
      return {loading: false, success: false, error: action.payload}
    default:
      return state
  }
}

