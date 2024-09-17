import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../components/inputField';
import useForm from '../../hooks/useForm';



type UserInformation = {
  email:string;
  password:string;
}

//유효성 검증 훅을 사용한 함수사용하기
//에러를 리턴함..
function validateLogin(value:UserInformation){
  const errors={
    email:'',
    password:'',
  };
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)){
    errors.email = "올바른 이메일 형식이 아닙니다."
  }
    //이메일 형식이 올바르지 않다면 에러메시지 출력하삼요

  //비밀번호 검증하기
  if(!(value.password.length >=8 && value.password.length <20)){
    errors.password = "비밀번호는 8에서 20자리로 입력해주세요"

  }

  return errors;
}

function LoginScreen() {
  const navigation = useNavigation();
  const login = useForm({
    initialValue:{email:'',password:''},
    validate:validateLogin
  });

   //이메일과 password 객체형태로 담음
   const [values,setValues] = useState({
    email:'',
    password:'',
  })

  const [touched, setTouched] = useState({
    email:false,
    password:false,
  });

 

  //value 들을 객체형태로 onchangeText 로 넣을수잇음
  const handleChangeText = (name:string,text:string)=> {
    setValues({
      ...values,
      [name]:text,
    })
  };

  //블러처리 
  const handleBlur = (name:string)=>{
    setTouched({
      ...touched,
      [name]:true,
    });
  };

  //로그인 완료 버튼
  const handleLogin = () => {
      // 로그인 성공 시 홈 화면으로 이동
      navigation.navigate('홈');

    }

  /*
  객체형태로 만들기 전!  

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleChangeEmail = (text:string)=> {
    setEmail(text);
  }
  const handleChangePassword = (text:string) => {
    setPassword(text);
  }
  이렇게 하면 그냥
  value= {email}
  onChangeText={handleChangeEmail}
  이렇게 해주면 되는데.. 

  */

  

 

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>이메일</Text>
        <InputField
          placeholder="이메일을 입력하세요"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode='email'
          {...login.getTextInputProps('email')}
          onBlur={() => {
            login.getTextInputProps('email').onBlur(); 
          }}// useForm에서 props 가져오기

        />
        <Text>비밀번호</Text>
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          // 비밀번호가 마스킹 처리되어서 나타남
          touched={login.touched.password}
          {...login.getTextInputProps('password')}
          onBlur={() => {
            login.getTextInputProps('password').onBlur(); 
            // 추가 처리
            console.log('비밀번호 필드에서 블러 이벤트가 발생했습니다!');
          }}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin} >
            <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
      
    </SafeAreaView>

  )
};

/*

const LoginIng = () => {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  
  const storedId = 'testUser';
  const storedPassword = '1234';

  const handleLogin = () => {
    if (inputId === storedId && inputPassword === storedPassword) {
      // 로그인 성공 시 홈 화면으로 이동
      navigation.navigate('홈');
    } else {
      // 로그인 실패 시 오류 메시지 설정
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={inputId}
        onChangeText={setInputId}
      />
      
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={inputPassword}
        onChangeText={setInputPassword}
        secureTextEntry={true}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.findLogin}>
        <Text>아이디 찾기   </Text>
        <Text>비밀번호찾기</Text>
      </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin} >
            <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};
*/
const styles = StyleSheet.create({
  inputContainer:{
    gap:20,
    

  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"white",
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
  },
  findLogin:{
    flexDirection:"row",
    justifyContent:"flex-end"
  }
});

//export default LoginIng;
export default LoginScreen;