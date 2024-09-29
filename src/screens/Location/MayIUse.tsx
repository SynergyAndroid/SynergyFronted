/// 위치권한받음

import React, { useState } from 'react';
import { View, Text, Modal, Button, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MayIUse = ({ onLocationReceived }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState(null);

  // 안드로이드 위치 권한 요청 함수
  const requestLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      // 권한이 허용되었을 경우 위치 정보 가져오기
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setModalVisible(false);
          onLocationReceived({ latitude, longitude }); // 부모 컴포넌트로 위치 정보 전달
        },
        (error) => {
          Alert.alert('Error', 'Failed to get location');
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert('허용거부', '위치정보가 꺼졌습니다.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
              위치 권한이 필요합니다
            </Text>
            <Text style={{ marginBottom: 20 }}>
              위치 접근을 허용하겠습니까?
            </Text>
            <Button
              title="허용"
              onPress={requestLocationPermission}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MayIUse;
