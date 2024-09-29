//사용자위치정보를 받아서
//각 위치마다 map x 와 map y 에 각각 다른 정보를 넣어서
/// 위치마다 다른 정보 렌더링

// react-native-geolocation-service





import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const Location = () => {
  const [location, setLocation] = useState(null);
  
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: '위치정보 받아오기',
            buttonNeutral: '다음에도 묻기r',
            buttonNegative: '취소',
            buttonPositive: '네',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('위치정보받아옴');
          return true;
        } else {
          console.log('오류남');
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{alignItems:"center", marginTop:60, padding:40}}>
      <Text>Latitude: {location?.coords?.latitude}</Text>
      <Text>Longitude: {location?.coords?.longitude}</Text>
      <Button title="위치정보받기" onPress={getLocation} />
    </View>
  );
};

export default Location;

