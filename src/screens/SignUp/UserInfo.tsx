import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const UserInfo = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setId] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const validatePassword = () => {
    if (password.length < 4) {
      setPasswordError('비밀번호는 4자리 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleNext = () => {
    validatePassword();
    validateConfirmPassword();

    if (password.length >= 4 && password === confirmPassword) {
      // 여기서 사용자 정보를 저장할 수 있습니다 (예: AsyncStorage 사용)
      navigation.navigate('SignUpComplete');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 정보 입력</Text>
      
      <Text style={styles.label}>* 이름을 입력해주세요</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>* 별명을 입력해주세요</Text>
      <TextInput
        style={styles.input}
        placeholder="별명"
        value={nickname}
        onChangeText={setNickname}
      />
      
      <Text style={styles.label}>* 생년월일을 입력해주세요</Text>
      <TextInput
        style={styles.input}
        placeholder="생년월일 (YYYY-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
        keyboardType="numeric" 
      />

      <Text style={styles.label}>* 아이디를 입력해주세요</Text>
      <TextInput 
        style={styles.input}
        placeholder="아이디입력"
        value={id}
        onChangeText={setId}
      />
      
      <Text style={styles.label}>* 비밀번호를 입력해주세요</Text>
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.inputPassword}
          placeholder='비밀번호 입력'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          onBlur={validatePassword}  
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <Text style={styles.label}>* 비밀번호 확인을 입력해주세요</Text>
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.inputPassword}
          placeholder='비밀번호 재확인'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmPasswordVisible}
          onBlur={validateConfirmPassword}  
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <TouchableOpacity style={styles.buttonStyle} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
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

export default UserInfo;
