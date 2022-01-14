import { constants } from './constant'

function genresReducer(state = {}, action) {
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
            return {
                ...state,
                body: [action.payload, ...state.body],
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
            const data = state?.body.findIndex(x => x.id === action.payload.id);
            state.body[data] = action.payload;
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

export default genresReducer;