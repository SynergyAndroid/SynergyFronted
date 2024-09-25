//webview 라이브러리로 카카오로그인구현해보기


import axios from 'axios';
import axiosInstance from './axios';
import { getEncryptStorage } from '../../utils/encryptStorage';


const kakaoLogin = async(token:string):Promise<any>=>{
    const response = await axiosInstance.post('auth/oauth/kakao',{token})
        return response.data
    }

export {kakaoLogin};