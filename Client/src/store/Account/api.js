import { constants } from './constant';
import { axiosMethods } from 'common/function/AxiosMethod';
import { toast } from 'react-toastify';
import instanceRequest from "common/function/AxiosClient";

const Account = {
    Login,
}

function Login(request) {
    return async dispatch => {
        await dispatch({ type: constants.LOGIN_REQUEST, });
        const url = `/api/v1/account/admin`;
        const response = await instanceRequest(url, axiosMethods.POST, request);
        try {
            if(response.success) {
                localStorage.setItem('LOGIN_INFO', JSON.stringify(response.data));
                await dispatch({ type: constants.LOGIN_SUCCESS, payload: response.data });
                return true;
            }
            else {
                await dispatch({ type: constants.LOGIN_FAILURE, payload: response.message });
                toast.error(response?.message);
                return false;
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            await dispatch({ type: constants.LOGIN_FAILURE, payload: message });
            return false;
        }
    }
}
export default Account;