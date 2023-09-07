import { api, apiAI } from "../Axios";

export const signApi = async (data) => {
    try{
        const response = await apiAI.post(
            'http://127.0.0.1:5000/sign',
            data
        );
        return response;
    }catch (e) {
        if (e){
            return e.response;
        }
    }
};
export const sentenceCreate = async (data) => {
    try{
        console.log(1);
        const response = await apiAI.post(
            'http://127.0.0.1:5000/sentense',
            data
        );
        return response;
    }catch (e) {
        if (e){
            return e.response;
        }
    }
};