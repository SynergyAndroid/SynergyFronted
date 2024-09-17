// api 관련 페이지

import axios from 'axios';
//const apiBaseUrl = "http://localhost:8080";

/*
interface UserData {
  username: string;
  password: number;
  age: number;
  phone: number;
  location:string;
}

interface ProfileData {
  name: string;
  password: number;
  age: number;
  phone:number;
  location:string;
}

interface ProfileResponse {
  id: string;
  username: string;
  password: number;
  age: number;
  phone:number;
  location:string;
}

export const api = {
  signUp: async (userData: UserData): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  },
  
  getProfile: async (userId: string): Promise<ProfileResponse> => {
    const response = await axios.get(`${BASE_URL}/profile/${userId}`);
    return response.data;
  },
  
  updateProfile: async (userId: string, profileData: ProfileData): Promise<ProfileResponse> => {
    const response = await axios.put(`${BASE_URL}/profile/${userId}`, profileData);
    return response.data;
  }
};
*/

/*

async function postData() {
  try {
    const response = await axios.post('http://localhost:8080/');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


postData();
*/

//나중에 수정할 예정: delete data


/*
const deleteChat = async (rowKey) => {
  try {
    // 서버에 DELETE 요청을 보냄 (예시)
    await axios.delete();
     //-> 여기에 baseurl 을 넣을 것임


    // 성공적으로 삭제된 경우 로컬 상태에서도 제거
    const newData = chatData.filter(item => item.id !== rowKey);
    setChatData(newData);
  } catch (error) {
    console.error('삭제 중 오류 발생:', error);
  }
};

*/