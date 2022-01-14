import { constants } from './constant';
import { axiosMethods } from 'common/function/AxiosMethod';
import instanceRequest from "common/function/AxiosClient";

const Home = {
    Get
}

function Get() {
    return async dispatch => {
        await dispatch({ type: constants.GET_REQUEST, });
        const url = `/api/v1/dashboard`;
        const response = await instanceRequest(url, axiosMethods.GET);
        try {
            if(response.success) {
                return await dispatch({ type: constants.GET_SUCCESS, payload: response.data });
            }
            else {
                return await dispatch({ type: constants.GET_FAILURE, payload: response.message });
            }
        }
        catch{
            return await dispatch({ type: constants.GET_FAILURE, payload: "Error" });
        }
    }
}
export { Home };