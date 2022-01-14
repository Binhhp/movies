import { constants } from './constant'

function DashboardReducer(state = {}, action) {
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

        default: return state;
    }
}

export default DashboardReducer;