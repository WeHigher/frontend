import api from "../Axios";

export const signApi = async (data) => {
    try{
        const response = await api.post(
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