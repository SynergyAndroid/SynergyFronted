import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputField from '../components/inputField';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/queries/useAuth';

// 사용자 이름과 비밀번호 타입 정의
type UserInformation = {
  username: string;
  password: string;
};

// 유효성 검증 훅 사용
function validateLogin(value: UserInformation) {
  const errors = {
    username: '',
    password: '',
  };
  if (!value.username.trim()) {
    errors.username = '사용자 이름을 입력해주세요.';
  }

  if (!(value.password.length >= 8 && value.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자리로 입력해주세요';
  }

  return errors;
}

function LoginScreen() {
  const {loginMutation} = useAuth();
  const navigation = useNavigation();
  const login = useForm({
    initialValue: {username: '', password: ''},
    validate: validateLogin,
  });
  const handleLogin = () => {
    loginMutation.mutate(login.values, {
      onSuccess: () => {
        Alert.alert('로그인 성공!', '홈화면으로 이동합니다.');
        navigation.navigate('Home');
      },
      onError: () => {
        Alert.alert(
          '로그인 실패',
          '사용자 이름 또는 비밀번호가 올바르지 않습니다.',
        );
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>사용자 이름</Text>
        <InputField
          placeholder="사용자 이름을 입력하세요"
          error={login.errors.username}
          touched={login.touched.username}
          {...login.getTextInputProps('username')}
        />
        <Text>비밀번호</Text>
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          touched={login.touched.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  },
  findLogin: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

//export default LoginIng;
export default LoginScreen;
