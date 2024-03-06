import {
    ALL_DATA,
    CLEAR_SAVE_SCORE_ERR,
    CLEAR_SAVE_SCORE_SUCC,
    CLEAR_USER_ERROR_LOGIN,
    CLEAR_USER_ERROR_REGISTER,
    CLEAR_USER_LOGIN,
    CLEAR_USER_REGISTER,
    CLR_ALL_DATA,
    CLR_ERR_GET_DATA,
    CLR_PAGI_DATA_ERR,
    CLR_PAGI_DATA_SUCC,
    ERR_GET_DATA,
    PAGI_DATA_ERR,
    PAGI_DATA_SUCC,
    SAVE_SCORE_ERROR,
    SAVE_SCORE_SUCC,
    USER_ERROR_LOGIN,
    USER_ERROR_REGISTER,
    USER_LOGIN,
    USER_REGISTER
} from "../actionType/type";


const initialStat = {
    data: [],
    allData: [],
    length: 0,
    registerSuccess: "",
    registerError: "",

    successLogin: "",
    errorLogin: "",

    scoreSaveSucc: '',
    scoreSaveError: '',

    pagDataSucc: '',
    pagDataErr: '',

    allDataSucc: '',
    allDataErr: '',
}

export const imttrReducers = (state = initialStat, action) => {

    const { type, payload } = action;

    switch (type) {
        case USER_REGISTER:
            return {
                ...state,
                registerSuccess: payload.message
            }
        case CLEAR_USER_REGISTER:
            return {
                ...state,
                registerSuccess: ''
            }
        case USER_ERROR_REGISTER:
            return {
                ...state,
                registerSuccess: payload.message
            }
        case CLEAR_USER_ERROR_REGISTER:
            return {
                ...state,
                registerSuccess: ''
            }

        case USER_LOGIN:
            return {
                ...state,
                successLogin: payload.message
            }
        case CLEAR_USER_LOGIN:
            return {
                ...state,
                successLogin: ''
            }
        case USER_ERROR_LOGIN:
            return {
                ...state,
                errorLogin: payload.message
            }
        case CLEAR_USER_ERROR_LOGIN:
            return {
                ...state,
                errorLogin: ''
            }


        // SAVING SCORE 
        case SAVE_SCORE_SUCC:
            return {
                ...state,
                scoreSaveSucc: payload.message
            }
        case CLEAR_SAVE_SCORE_SUCC:
            return {
                ...state,
                scoreSaveSucc: ''
            }
        case SAVE_SCORE_ERROR:
            return {
                ...state,
                scoreSaveError: payload.message
            }
        case CLEAR_SAVE_SCORE_ERR:
            return {
                ...state,
                scoreSaveError: ''
            }

        // ----------- pagination
        case PAGI_DATA_SUCC:
            return {
                ...state,
                data: payload.data,
                length: payload.total,
                pagDataSucc: payload.message
            }
        case CLR_PAGI_DATA_SUCC:
            return {
                ...state,
                pagDataSucc: ''
            }
        case PAGI_DATA_ERR:
            return {
                ...state,
                pagDataErr: payload.message
            }
        case CLR_PAGI_DATA_ERR:
            return {
                ...state,
                pagDataErr: ''
            }

        // all Data 

        case ALL_DATA:
            return {
                ...state,
                allData: payload.data,
                allDataSucc: payload.message
            }
        case CLR_ALL_DATA:
            return {
                ...state,
                allDataSucc: ''
            }
        case ERR_GET_DATA:
            return {
                ...state,
                allDataSucc: payload.message
            }
        case CLR_ERR_GET_DATA:
            return {
                ...state,
                allDataSucc: payload.message
            }
        default:
            break;
    }

    return state
}