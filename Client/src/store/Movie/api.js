import { constants } from './constant';
import { axiosMethods } from 'common/function/AxiosMethod';
import { toast } from 'react-toastify';
import instanceRequest from "common/function/AxiosClient";

const Movie = {
    Get,
    GetInfo,
    CreateOrUpdate, 
    Delete
}

function Get() {
    return async dispatch => {
        await dispatch({ type: constants.GET_REQUEST, });
        const url = `/api/v1/movie`;
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
function GetInfo(movieId){
    return async dispatch => {
        await dispatch({ type: constants.GET_INFO_REQUEST });
        const url = `/api/v1/movie/${movieId}/value`;
        const response = await instanceRequest(url, axiosMethods.GET);
        try {
            if(response.success) {
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
function CreateOrUpdate(payload, movieId = "") {
    return async dispatch => {
        await dispatch({ type: movieId ? constants.UPDATE_REQUEST : constants.CREATE_REQUEST });
        let url = `/api/v1/movie`;
        if(movieId) url += `/${movieId}`;
        const response = await instanceRequest(url, movieId ? axiosMethods.PUT : axiosMethods.POST, payload);
        try {
            if(response.success) {
                toast.success(response.message);
                return await dispatch({ type: movieId ? constants.UPDATE_SUCCESS : constants.CREATE_SUCCESS, payload: response.data });
            }
            else {
                await dispatch({ type: movieId ? constants.UPDATE_FAILURE : constants.CREATE_FAILURE, payload: response.message });
                return toast.error(response?.message);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: movieId ? constants.UPDATE_FAILURE : constants.CREATE_FAILURE, payload: message });
        }
    }
}

function Delete(movieId){
    return async dispatch => {
        await dispatch({ type: constants.DELETE_REQUEST });
        const url = `/api/v1/movie/${movieId}`;
        const response = await instanceRequest(url, axiosMethods.DELETE);
        try {
            if(response.success) {
                toast.success(response.message);
                return await dispatch({ type: constants.DELETE_SUCCESS, payload: movieId });
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
export { Movie };