import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 생년월일과 프로필 사진을 관리하는 훅
export const useProfileAsyncStorage = () => {
  const [birthdate, setBirthdate] = useState(new Date(1993, 0, 1)); // 기본값 설정
  const [photo, setPhoto] = useState(null); // 프로필 사진 저장 상태

  // 생년월일과 사진 불러오기
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedBirthdate = await AsyncStorage.getItem('birthdate');
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');

        if (storedBirthdate) {
          setBirthdate(new Date(storedBirthdate));
        }
        if (storedPhoto) {
          setPhoto({uri: storedPhoto}); // AsyncStorage에 저장된 사진 URI를 상태에 설정
        }
      } catch (e) {
        console.log('Error loading profile data', e);
      }
    };
    loadProfileData();
  }, []);

  // 생년월일 저장
  const saveBirthdate = async (newBirthdate: Date) => {
    try {
      setBirthdate(newBirthdate);
      await AsyncStorage.setItem('birthdate', newBirthdate.toISOString());
    } catch (e) {
      console.log('Error saving birthdate', e);
    }
  };

  // 프로필 사진 저장
  const savePhoto = async (newPhotoUri: string) => {
    try {
      setPhoto({uri: newPhotoUri});
      await AsyncStorage.setItem('profilePhoto', newPhotoUri); // 사진 URI를 AsyncStorage에 저장
    } catch (e) {
      console.log('Error saving photo', e);
    }
  };

  return {
    birthdate,
    saveBirthdate,
    photo,
    savePhoto,
  };
};
