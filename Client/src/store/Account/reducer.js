import { constants } from './constant'
let user = JSON.parse(localStorage.getItem('LOGIN_INFO'));
const initialState = user ? { loggedIn: true, user: user } : {};
function accountReducer(state = initialState, action) {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.LOGIN_SUCCESS:
            var result = {
                loggedIn: true,
                user: action.payload
            };

            return result;

        case constants.LOGIN_FAILURE:
            return {
                errors: action.payload
            }
        default: return state;
    }
}

export default accountReducer;