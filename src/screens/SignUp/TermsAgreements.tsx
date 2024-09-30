/*
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsAgreement = () => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [ageAgreed, setAgeAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [locationAgreed, setLocationAgreed] = useState(false);
  const navigation = useNavigation();

  // 전체 동의 여부를 감지하는 useEffect
  useEffect(() => {
    if (ageAgreed && termsAgreed && privacyAgreed && locationAgreed) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  }, [ageAgreed, termsAgreed, privacyAgreed, locationAgreed]); // 의존성 배열에 포함된 변수들 중 하나라도 변화가 생기면, 그때마다 useEffect가 다시 실행

  // 전체 동의 버튼 동의 및 해제
  const handleAllAgree = (value: boolean) => {
    setAllAgreed(value);
    setAgeAgreed(value);
    setTermsAgreed(value);
    setPrivacyAgreed(value);
    setLocationAgreed(value);
  };

  // 다음 버튼 활성화 
  const handleNext = () => {
    if (ageAgreed && termsAgreed && privacyAgreed && locationAgreed) {
      navigation.navigate('UserInfo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>서비스 이용 동의</Text>

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => handleAllAgree(!allAgreed)}
      >
        <View style={styles.checkbox}>
          {allAgreed && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.optionText}>약관 전체 동의</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setAgeAgreed(!ageAgreed)}
      >
        <View style={styles.checkbox}>
          {ageAgreed && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.optionText}>(필수) 만 14세 이상입니다.</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setTermsAgreed(!termsAgreed)}
      >
        <View style={styles.checkbox}>
          {termsAgreed && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.optionText}>(필수) 서비스 이용약관</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setPrivacyAgreed(!privacyAgreed)}
      >
        <View style={styles.checkbox}>
          {privacyAgreed && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.optionText}>(필수) 개인 정보 처리 방침</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setLocationAgreed(!locationAgreed)}
      >
        <View style={styles.checkbox}>
          {locationAgreed && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.optionText}>(필수) 위치정보 제공</Text>
      </TouchableOpacity >
      <TouchableOpacity style={styles.buttonStyle} onPress={handleNext} disabled={!allAgreed}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 18,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  buttonStyle:{
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#005F40',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    
  },
  buttonText:{
    color:"white",
  }
});

export default TermsAgreement;
*/
