//나이를 선택하는 기능 -> 훅으로 분리
// asyncstorage 를 사용해서 나이 저장시켜두었음
// ProfileAge.tsx
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';

export const useAgePicker = () => {
  const [birthdate, setBirthdate] = useState(new Date(1993, 0, 1)); // 기본값 설정
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // 앱을 다시 열었을 때 저장된 생년월일 불러오기
    const loadBirthdate = async () => {
      const storedBirthdate = await AsyncStorage.getItem('birthdate');
      if (storedBirthdate) {
        setBirthdate(new Date(storedBirthdate));
      }
    };
    loadBirthdate();
  }, []);

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const handleDateChange = async (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowPicker(false);
    setBirthdate(currentDate); // 선택된 날짜로 설정

    // 선택된 날짜를 AsyncStorage에 저장
    await AsyncStorage.setItem('birthdate', currentDate.toISOString());
  };

  const BirthdatePicker = () => (
    <View>
      <TouchableOpacity style={styles.infoRow} onPress={openDatePicker}>
        <Text style={styles.infoLabel}>생년월일</Text>
        <Text style={styles.infoText}>
          {`${birthdate.getFullYear()}년 ${
            birthdate.getMonth() + 1
          }월 ${birthdate.getDate()}일`}
        </Text>
        <Icon name="right" size={16} color="#ccc" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );

  return {BirthdatePicker};
};

const styles = {
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
};
