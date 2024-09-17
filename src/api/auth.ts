import axios from 'axios';
import { AnimatableStringValue } from 'react-native';
import axiosInstance from './axios';



type RequestUser={
    username:string,
    email:string,
    password:string,
};

// 회원가입 api 
const postSignup = async ({username, email,password}:RequestUser):Promise<void>=> {
    const {data}=axiosInstance.post('/user/signup',{
        username,
        email,
        password,

    });
    return data;
};

type ResponseToken={
    accessToken:string;
    refeshToken:string;
}

// 로그인은 리스폰스 바디로 엑세스 토큰과 리프레시 토큰이 오기 때문에 
// 리턴타입을 ResponseToken 이 와야 함 



const postLogin = async({
    username,
    email,
    password,
}:RequestUser):Promise<ResponseToken>=>{
    const {data} = await axios.post('/user/login', {
        username,
        email,
        password
    });

    return data;
};

type ResponseProfile = Profile & Category;


//로그인한 유저의 프로필 정보 가져오기
// 프로필 가지고 올 api 아직 없음 
const getProfile = async(): Promise<ResponseProfile>=>{
    const {data} = await axiosInstance.get('/auth/me');

    return data;
};

const getAccessToken = async ():Promise<ResponseToken>=>{
    const refreshToken = await getEncryptStorage('refreshToken');
    const {data} = await axiosInstance.get('/auth/refresh', {
        headers:{
            Authorizatiohn:`Bearer ${refreshToken}`, 

        },
    });
    return data;

};

// 로그아웃
const logout = async() => {
    await axiosInstance.post('/auth/logout');

};


 








export {postSignup,postLogin,getProfile,getAccessToken,logout};
export type {RequestUser,ResponseToken,ResponseProfile};
