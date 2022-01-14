import axios from "axios";
import { axiosMethods, errorResponse } from "./AxiosMethod";

const instance = axios.create({
    baseURL: `https://moview.azurewebsites.net`
});

async function instanceRequest(url, options, payload = null) {
    let response;
    if(options === axiosMethods.GET){
        response = await instance.get(url).catch((error) => {
            return errorResponse(error)
        });
    } 

    if(options === axiosMethods.POST) {
        response = await instance.post(url, payload).catch(error =>{
            return errorResponse(error)
        });
    }
    if(options === axiosMethods.PUT) {
        response = await instance.put(url, payload).catch(error =>{
            return errorResponse(error)
        });
    }
    if(options === axiosMethods.DELETE){
        const options = {};
        if(payload != null) options['data'] = payload;
        response = await instance.delete(url, options).catch(error =>{
            return errorResponse(error)
        });
    }
    return response.data;
}

export default instanceRequest;