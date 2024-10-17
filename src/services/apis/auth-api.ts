import axiosService from '@/services/apis/axios-service';
import { IPayload } from '@/services/apis/type';

export const userLoginAPI = async (payload: IPayload) => {
    return await axiosService.post('/v1/user/login', payload);
};

export const getCurrentUserAPI = async () => {
    return await axiosService.get('/v1/user/info');
};

export const forgotPasswordAPI = async (payload: IPayload) => {
    return await axiosService.post('/v1/user/password/forgot', payload);
};

export const resetPasswordAPI = async (payload: IPayload) => {
    return await axiosService.post('/v1/user/password/reset', payload);
};
