import { constants } from './constant'

function movieReducer(state = {}, action) {
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

        case constants.DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case constants.DELETE_SUCCESS:
            const newState = state?.body?.filter(item => item.id !== action.payload);
            return {
                body: newState
            }

        case constants.DELETE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            }

        default: return state;
    }
}

function movieInfoReducer(state = {}, action) {
    switch (action.type) {
        case constants.GET_INFO_REQUEST:
            return {
                loading: true,
            }
        case constants.GET_INFO_SUCCESS:
            return {
                body: action.payload
            }

        case constants.GET_INFO_FAILURE:
            return {
                errors: action.payload
            }
        default: return state;
    }
}

function movieCreateReducer(state = {}, action) {
    switch (action.type) {
        case constants.CREATE_REQUEST:
            return {
                loading: true,
            }
        case constants.CREATE_SUCCESS:
            return {
                loading: false
            }

        case constants.CREATE_FAILURE:
            return {
                errors: action.payload
            }
        default: return state;
    }
}
function movieUpdateReducer(state = {}, action) {
    switch (action.type) {
        case constants.UPDATE_REQUEST:
            return {
                loading: true,
            }
        case constants.UPDATE_SUCCESS:
            return {
                loading: false
            }

        case constants.UPDATE_FAILURE:
            return {
                errors: action.payload
            }
        default: return state;
    }
}
export { movieReducer, movieCreateReducer, movieInfoReducer, movieUpdateReducer };