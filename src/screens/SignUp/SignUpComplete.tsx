// src/screens/SignUp/SignUpComplete.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpComplete = () => {
  const navigation = useNavigation();

  const handleFinish = () => {
    navigation.navigate("Login");

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 완료!</Text>
      <Text style={styles.description}>축하합니다! 회원가입이 완료되었습니다.</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleFinish}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#005F40',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpComplete;