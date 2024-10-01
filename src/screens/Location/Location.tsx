import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 위치 정보를 백엔드에 저장하는 함수
export const saveUserLocation = async () => {
  try {
    // AsyncStorage에서 위치 정보를 가져옵니다.
    const mapX = await AsyncStorage.getItem('mapX');
    const mapY = await AsyncStorage.getItem('mapY');
    const username = await AsyncStorage.getItem('username'); // 사용자 이름도 저장된 경우

    const response = await axios.post(
      'http://192.168.0.27:9090/user/location',
      {
        username,
        mapX,
        mapY,
      },
    );

    if (response.status === 200) {
      console.log('위치 정보 저장 성공:', response.data);
    } else {
      console.error('위치 정보 저장 실패:', response.data);
    }
  } catch (error) {
    console.error('위치 정보 저장 중 오류 발생:', error);
    // 오류가 발생하면 더 구체적인 처리를 할 수 있습니다.
  }
};
