import axios from 'axios'
import {
    ALL_DATA,
    ERR_GET_DATA,
    PAGI_DATA_ERR,
    PAGI_DATA_SUCC,
    SAVE_SCORE_ERROR,
    SAVE_SCORE_SUCC,
    USER_ERROR_LOGIN,
    USER_ERROR_REGISTER,
    USER_LOGIN, USER_REGISTER
} from '../actionType/type'


export const register = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:8001/api/user/registeration`, data)
            dispatch({
                type: USER_REGISTER,
                payload: {
                    message: response.data.message
                }
            })
        } catch (error) {
            dispatch({
                type: USER_ERROR_REGISTER,
                payload: {
                    message: error.response.data.message
                }
            })
        }
    }
}

export const loginUser = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:8001/api/user/login`, data)
            localStorage.setItem("token", response.data.token);

            dispatch({
                type: USER_LOGIN,
                payload: {
                    message: response.data.message
                }
            })
        } catch (error) {
            dispatch({
                type: USER_ERROR_LOGIN,
                payload: {
                    message: error.response.data.message
                }
            })
        }
    }
}

export const saveScore = (obj) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:8001/api/stud/saveScore`, obj);
            dispatch({
                type: SAVE_SCORE_SUCC,
                payload: {
                    message: response.data.message
                }
            })
        } catch (error) {
            dispatch({
                type: SAVE_SCORE_ERROR,
                payload: {
                    message: error.response.data.message
                }
            })
        }
    }
}

export const paginationScore = (obj) => {
    const { page, pageSize } = obj;
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8001/api/stud/score/?page=${page}&pageSize=${pageSize}`)
            dispatch({
                type: PAGI_DATA_SUCC,
                payload: {
                    data: response.data.scores,
                    total: response.data.examnee,
                    message: response.data.message
                }
            })
        } catch (error) {
            dispatch({
                type: PAGI_DATA_ERR,
                payload: {
                    message: error.response.data.message
                }
            })
        }
    }
} 


export const getAllData = (obj) =>{
    const {id,email} = obj
    return async(dispatch) =>{
        try {
            const response = await axios.get(`http://localhost:8001/api/stud/allScore/?id=${id}&email=${email}`)
         
            console.log(response.data.data);

            dispatch({
                type: ALL_DATA,
                payload:{
                    data: response.data.data,
                    message: response.data.message
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: ERR_GET_DATA,
                payload:{
                    message: error.response.data.message
                }
            })
        }
    }
}