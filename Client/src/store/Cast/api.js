import { constants } from './constant';
import { axiosMethods } from 'common/function/AxiosMethod';
import { toast } from 'react-toastify';
import instanceRequest from "common/function/AxiosClient";

const Cast = {
    Get,
    GetInfo,
    CreateOrUpdate,
    Delete
}

function Get() {
    return async dispatch => {
        await dispatch({ type: constants.GET_REQUEST, });
        const url = `/api/v1/cast`;
        const response = await instanceRequest(url, axiosMethods.GET);
        try {
            if(response.success) {
                return await dispatch({ type: constants.GET_SUCCESS, payload: response.data });
            }
            else {
                await dispatch({ type: constants.GET_FAILURE, payload: response.message });
                return toast.error(response?.message);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: constants.GET_FAILURE, payload: message });
        }
    }
}
function GetInfo(genreId){
    return async dispatch => {
        await dispatch({ type: constants.GET_INFO_REQUEST });
        const url = `/api/v1/cast/${genreId}`;
        const response = await instanceRequest(url, axiosMethods.GET);
        try {
            if(response.success) {
                toast.success(response.message);
                return await dispatch({ type: constants.GET_INFO_SUCCESS, payload: response.data });
            }
            else {
                await dispatch({ type: constants.GET_INFO_FAILURE, payload: response.message });
                return toast.error(response?.message);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: constants.GET_INFO_FAILURE, payload: message });
        }
    }
}
function CreateOrUpdate(payload, castId = "") {
    return async dispatch => {
        const request = castId ? constants.UPDATE_REQUEST : constants.CREATE_REQUEST;
        await dispatch({ type: request });
        let url = `/api/v1/cast`;
        if(castId) url += `/${castId}`; 
        const response = await instanceRequest(url, castId ? axiosMethods.PUT : axiosMethods.POST, payload);

        try {
            if(response.success) {
                toast.success(response.message);
                return await dispatch({ type: castId ? constants.UPDATE_SUCCESS : constants.CREATE_SUCCESS, payload: response.data });
            }
            else {
                await dispatch({ type: castId ? constants.UPDATE_FAILURE : constants.CREATE_FAILURE, payload: response.message });
                return toast.error(response?.message || response?.title);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: castId ? constants.UPDATE_FAILURE : constants.CREATE_FAILURE, payload: message });
        }
    }
}

function Delete(castId){
    return async dispatch => {
        await dispatch({ type: constants.DELETE_REQUEST });
        const url = `/api/v1/cast/${castId}`;
        const response = await instanceRequest(url, axiosMethods.DELETE);
        try {
            if(response.success) {
                toast.success(response.message);
                return await dispatch({ type: constants.DELETE_SUCCESS, payload: castId });
            }
            else {
                await dispatch({ type: constants.DELETE_FAILURE, payload: response.message });
                return toast.error(response?.message);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: constants.DELETE_FAILURE, payload: message });
        }
    }
}
export { Cast };