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
import {useProfileAsyncStorage} from './ProfileAsyncStroage.tsx'; // 커스텀 훅 불러오기
import {usePhotoPicker} from './ProfilePhoto.tsx'; // 사진 관리 훅 불러오기
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker 사용
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileEdit = () => {
  const {birthdate, saveBirthdate} = useProfileAsyncStorage(); // 생년월일 관리 훅
  const {photo, selectPhotoFromGallery, takePhotoWithCamera} = usePhotoPicker(); // 사진 관리 훅
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 표시 여부

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (e) {
        console.log('Error loading username', e);
      }
    };
    fetchUsername();
  }, []);

  const openOptionsModal = () => setModalVisible(true);
  //사진선택후 처리: 선택한 사진 저장
  const handlePhotoSelection = (uri: string) => {
    savePhoto(uri); // 사진 저장
    setModalVisible(false); // 모달 닫기
  };
  //생년월일선택후 처리: 선택날짜 저장
  const handleBirthdateChange = (
    event: any,
    selectedDate: Date | undefined,
  ) => {
    setShowDatePicker(false); // DatePicker 닫기
    if (selectedDate) {
      saveBirthdate(selectedDate); // 선택한 날짜 저장
    }
  };
  return (
    <View style={styles.container}>
      {/* 프로필 사진 변경 */}
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

      {/* 사진 선택 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={selectPhotoFromGallery}>
              {/* 갤러리에서 사진 선택 */}
              <Icon
                name="picture"
                size={24}
                color="#333"
                style={styles.modalIcon}
              />
              <Text style={styles.modalOptionText}>사진 선택하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={takePhotoWithCamera}>
              {/* 카메라로 사진 촬영 */}
              <Icon
                name="camerao"
                size={24}
                color="#333"
                style={styles.modalIcon}
              />
              <Text style={styles.modalOptionText}>카메라로 촬영하기</Text>
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

      {/* 사용자 이름 */}
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>사용자 이름</Text>
          <Text style={styles.infoText}>{username}</Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>

        {/* 생년월일 */}
        <TouchableOpacity
          style={styles.infoRow}
          onPress={() => setShowDatePicker(true)}>
          {/* 생년월일 클릭 시 DatePicker 표시 */}
          <Text style={styles.infoLabel}>생년월일</Text>
          <Text style={styles.infoText}>
            {`${birthdate.getFullYear()}년 ${
              birthdate.getMonth() + 1
            }월 ${birthdate.getDate()}일`}
          </Text>
          <Icon name="right" size={16} color="#ccc" />
        </TouchableOpacity>

        {/* DateTimePicker 표시 */}
        {showDatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="spinner"
            onChange={handleBirthdateChange}
            maximumDate={new Date()}
          />
        )}

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
  cancelOptionText: {
    color: '#FF3B30',
  },
  modalIcon: {
    marginLeft: 10,
  },
});

export default ProfileEdit;
