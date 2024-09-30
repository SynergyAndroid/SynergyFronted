import axiosInstance from './axios';
import {storeUsername} from '../asyncstorage/storage.ts';

type RequestUser = {
  username: string;
  email: string;
  password: string;
};

const postSignup = async ({
  username,
  email,
  password,
}: RequestUser): Promise<any> => {
  try {
    const response = await axiosInstance.post('/user/signup', {
      username,
      email,
      password,
    });

    if (response.data) {
      // 회원가입 성공 시 바로 로그인 처리
      const loginResponse = await postLogin({username, password});
      if (loginResponse.accessToken) {
        await storeUsername(username);
        return {...response.data, username};
      }
    }
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type LoginRequest = {
  username: string;
  password: string;
};

const postLogin = async ({
  username,
  password,
}: LoginRequest): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/user/login', {
    username,
    password,
  });

  if (data.accessToken) {
    // 로그인 성공 시
    await storeUsername(username); // AsyncStorage에 사용자 이름 저장
  }

  return data;
};

const logout = async () => {
  await axiosInstance.post('/user/logout');
  await AsyncStorage.removeItem('username'); // 로그아웃 시 username 제거
};

export {postSignup, postLogin, logout};
export type {RequestUser, ResponseToken};
