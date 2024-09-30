import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfileEdit = () => {
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('카메라 권한이 허용되었습니다');
          return true;
        } else {
          console.log('카메라 권한이 거부되었습니다');
          return false;
        }
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
    setModalVisible(false);
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

  const openOptionsModal = () => setModalVisible(true);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          {photo ? (
            <Image source={photo} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        <TouchableOpacity onPress={openOptionsModal}>
          <Text style={styles.changePhotoText}>사진 바꾸기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={takePhotoWithCamera}>
              <Icon
                name="camerao"
                size={24}
                color="#333"
                style={styles.modalIcon}
              />
              <Text style={styles.modalOptionText}>카메라로 촬영하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={selectPhotoFromGallery}>
              <Icon
                name="picture"
                size={24}
                color="#333"
                style={styles.modalIcon}
              />
              <Text style={styles.modalOptionText}>사진 선택하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={() => setModalVisible(false)}>
              <Icon
                name="close"
                size={24}
                color="#333"
                style={styles.modalIcon}
              />
              <Text style={[styles.modalOptionText, styles.cancelOptionText]}>
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>사용자 이름</Text>
          <Text style={styles.infoText}>김순득</Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>나이</Text>
          <Text style={styles.infoText}>48</Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>내 위치 수정하기</Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  changePhotoText: {
    marginTop: 10,
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  cancelOption: {
    borderBottomWidth: 0,
  },
  cancelOptionText: {
    color: '#FF3B30',
  },
  modalIcon: {
    marginLeft: 10,
  },
});

export default ProfileEdit;
