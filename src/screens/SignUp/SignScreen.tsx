import {Alert} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputField from '../../components/inputField';
import useForm from '../../../hooks/useForm';
import useAuth from '../../../hooks/queries/useAuth';

function validateSignup(values: {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  const errors = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  // 이메일 형식 검증
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 길이 검증
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8에서 20자리로 입력해주세요';
  }

  // 비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지 출력
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

function SignScreen() {
  useRef<TextInput | null>(null);
  useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth(); // 로그인 mutation 추가
  const navigation = useNavigation();

  // useForm 훅을 통해 입력 값과 유효성 검증 로직을 연결
  const SignUp = useForm({
    initialValue: {username: '', email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  // 모든 필드가 채워지고, 에러가 없는지 확인하는 함수
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

  // 회원가입 완료 버튼 핸들러
  const handleSignUp = async () => {
    try {
      // 회원가입 mutation 호출
      signupMutation.mutate(SignUp.values, {
        onSuccess: () => {
          // 회원가입 성공 시 로그인 mutation 호출
          loginMutation.mutate(SignUp.values, {
            onSuccess: () => {
              Alert.alert('회원가입 성공!', '홈 화면으로 이동합니다.');
              console.log('회원가입 완료', SignUp.values);
              navigation.navigate('Home');
            },
            onError: error => {
              console.error('로그인 중 오류:', error);
              Alert.alert('로그인 실패', '로그인 중 문제가 발생했습니다.');
            },
          });
        },
        onError: error => {
          console.error('회원가입 중 오류:', error);
          Alert.alert('회원가입 실패', '회원가입 중 문제가 발생했습니다.');
        },
      });
    } catch (error) {
      console.error('회원가입 시 캐치된 오류:', error);
      Alert.alert(
        '회원가입 실패',
        '회원가입 중 예상치 못한 오류가 발생했습니다.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>사용자명</Text>
        <InputField
          placeholder="사용자명을 입력하세요"
          error={SignUp.errors.username}
          touched={SignUp.touched.username}
          {...SignUp.getTextInputProps('username')}
        />
        <Text>이메일</Text>
        <InputField
          placeholder="이메일을 입력하세요"
          error={SignUp.errors.email}
          touched={SignUp.touched.email}
          inputMode="email"
          {...SignUp.getTextInputProps('email')}
        />
        <Text>비밀번호</Text>
        <InputField
          placeholder="비밀번호"
          error={SignUp.errors.password}
          secureTextEntry
          touched={SignUp.touched.password}
          {...SignUp.getTextInputProps('password')}
        />
        <Text>비밀번호 확인</Text>
        <InputField
          placeholder="비밀번호 확인"
          error={SignUp.errors.passwordConfirm}
          secureTextEntry
          touched={SignUp.touched.passwordConfirm}
          {...SignUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonStyle, !isFormValid() && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!isFormValid()}>
        <Text style={styles.buttonText}>회원가입 완료!</Text>
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
  },
  buttonDisabled: {
    backgroundColor: '#cccccc', // 버튼 비활성화 시 회색
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
});

export default SignScreen;
