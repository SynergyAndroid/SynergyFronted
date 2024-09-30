import axiosInstance from './axiosInstance'; // axios 인스턴스 가져오기

// 위치 정보를 백엔드에 저장하는 함수
const saveUserLocation = async (
  userId: number,
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await axiosInstance.post('/api/save-location', {
      userId: userId, // 사용자 ID
      mapX: latitude, // 위도
      mapY: longitude, // 경도
    });

    if (response.status === 200) {
      console.log('위치 정보 저장 성공:', response.data);
    } else {
      console.error('위치 정보 저장 실패:', response.data);
    }
  } catch (error) {
    console.error('위치 정보 저장 중 오류 발생:', error);
  }
};

export default saveUserLocation;
