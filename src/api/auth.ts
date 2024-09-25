import axios from 'axios';
import axiosInstance from './axios';
import { getEncryptStorage } from '../../utils/encryptStorage';

type RequestUser = {
    username: string;
    email: string;
    password: string;
};

const postSignup = async ({ username, email, password }: RequestUser): Promise<any> => {
    try {
        const response = await axiosInstance.post('/user/signup', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("회원가입 오류:", error);
        throw error;
    }
};

type ResponseToken = {
    accessToken: string;
    refreshToken: string; 
};

const postLogin = async ({ username, email, password }: RequestUser): Promise<ResponseToken> => {
    const { data } = await axiosInstance.post('/user/login', {
        username,
        email,
        password
    });

    return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
    const { data } = await axiosInstance.get('/user/me');
    return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
    const refreshToken = await getEncryptStorage('refreshToken');
    const { data } = await axiosInstance.get('/user/refresh', {
        headers: {
            Authorization: `Bearer ${refreshToken}`, 
        },
    });
    return data;
};

const logout = async () => {
    await axiosInstance.post('/user/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };

