import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePhotoPicker} from './ProfilePhoto'; // 사진 선택 훅
import {useAgePicker} from './ProfileAge'; // 생년월일 선택 훅

const ProfileEdit = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const {photo, selectPhotoFromGallery, takePhotoWithCamera} = usePhotoPicker();
  const {BirthdatePicker} = useAgePicker(); // 생년월일 훅 사용

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

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
          <Text style={styles.infoText}>{username}</Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>

        {/* 생년월일 선택 부분 */}
        <BirthdatePicker />

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
