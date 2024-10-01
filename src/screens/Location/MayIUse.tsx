import React, {useState} from 'react';
import {Modal, View, Text, Button, StyleSheet, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MayIUse = ({onLocationReceived}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleAccept = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        // AsyncStorage에 위치 정보를 저장
        await AsyncStorage.setItem('mapX', latitude.toString());
        await AsyncStorage.setItem('mapY', longitude.toString());

        onLocationReceived(latitude, longitude);
        setModalVisible(false); // 모달 닫기
      },
      error => {
        Alert.alert('위치 정보를 가져올 수 없습니다', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Synergy에서 내 기기 위치에 액세스 하도록 허용하시겠습니까?
          </Text>
          <Button title="앱 사용 중에만 허용" onPress={handleAccept} />
          <Button title="거부" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MayIUse;
