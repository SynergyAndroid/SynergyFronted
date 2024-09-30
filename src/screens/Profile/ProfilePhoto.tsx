// usePhotoPicker.ts
import {useState} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const usePhotoPicker = () => {
  const [photo, setPhoto] = useState(null);

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

  const handleImageSelection = response => {
    if (response.didCancel) {
      console.log('사용자가 이미지 선택을 취소했습니다.');
    } else if (response.errorCode) {
      console.log('이미지 선택 에러:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      setPhoto({uri: response.assets[0].uri});
    }
  };

  const selectPhotoFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, handleImageSelection);
  };

  const takePhotoWithCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
        },
        handleImageSelection,
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
