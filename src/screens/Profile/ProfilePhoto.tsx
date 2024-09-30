// ProfilePhoto.tsx
import {useState} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const usePhotoPicker = () => {
  const [photo, setPhoto] = useState(null);

  // 카메라 권한 요청
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '카메라 권한 요청',
            message:
              '이 앱은 프로필 사진 촬영을 위해 카메라 접근 권한이 필요합니다.',
            buttonNeutral: '나중에 묻기',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  // 이미지 선택 후 처리
  const handleImageSelection = response => {
    if (response.didCancel) {
      console.log('사용자가 이미지 선택을 취소했습니다.');
    } else if (response.errorCode) {
      console.log('이미지 선택 에러:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const selectedPhotoUri = response.assets[0].uri;
      setPhoto({uri: selectedPhotoUri}); // 실제 이미지 URI 설정
    } else {
      console.log('선택된 이미지가 없습니다.');
    }
  };

  // 갤러리에서 사진 선택
  const selectPhotoFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response =>
      handleImageSelection(response),
    );
  };

  // 카메라로 사진 촬영
  const takePhotoWithCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
        },
        response => handleImageSelection(response),
      );
    } else {
      Alert.alert(
        '권한 오류',
        '카메라를 사용하려면 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
      );
    }
  };

  return {
    photo,
    selectPhotoFromGallery,
    takePhotoWithCamera,
  };
};
