import {
  UPDATE_PROFILE_STATUS_FAIL,
  UPDATE_PROFILE_STATUS_REQUEST,
  UPDATE_PROFILE_STATUS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios'
import { BASE_URL } from '../constants/global'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const { data } = await axios.post(`${BASE_URL}/api/login`, { email, password }, config)
 
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
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

    console.log('userInfo.token', userInfo.token)

    const { data } = await axios.post(`${BASE_URL}/api/logout`, config)
 
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    })

    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })

  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }

}

export const register =
  (first_name, last_name, email, password, type) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      
      const { data } = await axios.post(
        `${BASE_URL}/api/register`,
        { name: first_name, last_name, email, password, type },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
      
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`${BASE_URL}/api/user`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetailsWithUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`${BASE_URL}/api/users/${userId}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`${BASE_URL}/api/user/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfileStatus = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_STATUS_REQUEST
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
    
    const { data } = await axios.put(`${BASE_URL}/api/users/update_profile_status`, '', config)
    const {message, user, token } = data
    dispatch({
      type: UPDATE_PROFILE_STATUS_SUCCESS,
      payload: message
    })

    const userAndToken = {user, token}

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userAndToken,
    })

    localStorage.removeItem('userInfo')
    localStorage.setItem('userInfo', JSON.stringify(userAndToken))

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
