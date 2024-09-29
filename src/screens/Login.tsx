// 일단 이거 안쓸거임
/*
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleKakaoLogin = async () => {
        try {
          // 카카오 로그인 요청 (인증 코드 받음)
          const scopes = ['profile_nickname', 'profile_image'];
          console.log("Kakao login initiated");
          const result = await KakaoLogin.login({ scopes });
          
          console.log('Login Success:', JSON.stringify(result));
          
          // 카카오에서 받은 인가 코드를 확인
          const authorizationCode = result.code;  // 인증 코드
          console.log('Authorization Code:', authorizationCode);
          
          // 인증 코드를 백엔드로 POST 요청
          console.log('인증코드요청');
          const response = await axios.post('https://localhost:9090/oauth/kakao/callback', {
            code: authorizationCode,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('Response from backend:', response.data);

          // 로그인 성공 후 홈으로 이동
          navigation.navigate('홈');
        } catch (error) {
          console.error('Login Failed:', error);
        }
      };
      
    handleKakaoLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>카카오 로그인 중...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Login;
*/