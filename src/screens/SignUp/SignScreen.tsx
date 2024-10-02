import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputField from '../../components/inputField';
import useForm from '../../../hooks/useForm';
import useAuth from '../../../hooks/queries/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MayIUse from '../Location/MayIUse'; // 위치 정보 모달

function validateSignup(values) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = '비밀번호는 8에서 20자리로 입력해주세요';
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
}

function SignScreen() {
  const navigation = useNavigation();
  const {signupMutation} = useAuth();
  const SignUp = useForm({
    initialValue: {username: '', email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const isFormValid = () => {
    const {values, errors} = SignUp;
    return (
      values.username.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0 &&
      values.passwordConfirm.length > 0 &&
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.passwordConfirm
    );
  };
  const handleLocationAccept;
  /*
  const handleSignUp = () => {
    if (isFormValid()) {
      signupMutation.mutate(SignUp.values, {
        onSuccess: () => {
          setShowLocationModal(true); // 위치 정보 요청 모달 표시
        },
        onError: error => {
          const errorMessage =
            error.response?.data?.message || '회원가입 중 문제가 발생했습니다.';
          Alert.alert('회원가입 실패', errorMessage);
        },
      });
    }
  };

 */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>사용자명</Text>
        <InputField
          label="사용자명"
          {...SignUp.getTextInputProps('username')}
        />
        <Text>이메일</Text>
        <InputField
          label="이메일"
          inputMode="email"
          {...SignUp.getTextInputProps('email')}
        />
        <Text>비밀번호</Text>
        <InputField
          label="비밀번호"
          secureTextEntry
          {...SignUp.getTextInputProps('password')}
        />
        <Text>비밀번호 확인</Text>
        <InputField
          label="비밀번호 확인"
          secureTextEntry
          {...SignUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      <MayIUse onLocationReceived={handleLocationAccept} />
      <TouchableOpacity
        style={[styles.buttonStyle, !isFormValid() && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!isFormValid()}>
        <Text style={styles.buttonText}>회원가입 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 20,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#005F40',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default SignScreen;
