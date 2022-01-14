import { constants } from './constant'

function companyReducer(state = {}, action) {
    switch (action.type) {
        case constants.GET_REQUEST:
            return {
                loading: true,
            }
        case constants.GET_SUCCESS:
            return {
                body: action.payload,
            }

        case constants.GET_FAILURE:
            return {
                errors: action.payload
            }
            
        case constants.CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case constants.CREATE_SUCCESS:
            const newArray = state.body;
            newArray.unshift(action.payload);
            return {
                ...state,
                body: newArray,
                loading: false
            }

        case constants.CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case constants.DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case constants.DELETE_SUCCESS:
            return {
                ...state,
                body: state?.body.filter(x => x.id !== action.payload),
                loading: false
            }

        case constants.DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case constants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case constants.UPDATE_SUCCESS:
            const index = state?.body.findIndex(x => x.id === action.payload.id);
            state.body[index] = action.payload;
            return {
                ...state,
                loading: false
            }

        case constants.UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        default: return state;
    }
}

export default companyReducer;