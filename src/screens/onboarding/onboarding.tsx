import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
// import * as KakaoLogin from '@react-native-seoul/kakao-login';

const OnboardingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const onboardingData = [
    {
      title: '시니어들의 커뮤니티 형성',
      text: `시니어들을 위한! 시니어들에 의한! 
      시니어 맞춤 커뮤니티를 통해 
  함께 여행을 떠나보세요`,
      image: require('../../components/assets/images/Networking.png'),
    },
    {
      title: '내 근처 기반 장소 추천',
      text: `내 근처에서 어디를 갈까 고민한 적 있나요? 
      시너지는 위치기반으로 
      사용자의 맞춤장소를 추천해드립니다!`,
      image: require('../../components/assets/images/finds.png'),
    },
    {
      title: ' 맞춤 여행정보',
      text: `시너지는 여러분을 위한 맞춤 코스를 제공해요.
       장애인,어르신,영유아 등 모두를 위한 여행을
       부담없이 즐겨보세요
        `,
      image: require('../../components/assets/images/love.png'),
    },
    {
      title: '커뮤니티 검증',
      text: `특정 종교 권유 등 목적이 불건전한 
      커뮤니티 게시글은 지속적으로 삭제됩니다. 
      깨끗하고 검증된 커뮤니티를 만나보세요.`,
      image: require('../../components/assets/images/fire.png'),
    },
  ];

  const handlePageChange = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const handleLoginPress = () => {
    navigation.navigate("로그인");
  };

  // 홈버튼으로 일단 넘어가게 하려고 만든거임...
  // 나중에 없앨거임!!!

  const handleHomePress =() => {
    navigation.navigate("홈");
  };
  
  
  const handleSignUpPress = () => {
    navigation.navigate('SignScreen');
  };


  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={styles.page}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </PagerView>
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentPage && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Image
          source={require('../../components/assets/images/kakao_login_medium_wide.png')}
          style={styles.kakaoSymbol}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginEmailButton} onPress={handleLoginPress}>
        <Text style={styles.loginText}>
          이메일로 로그인하기 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SignupButton} onPress={handleSignUpPress}>
        <Text>회원가입하기</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={handleHomePress}>
        <Text>홈버튼</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  pagerView: {
    flex: 1,
    
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight:'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20
  },
  text: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderColor:"black",
    borderWidth: 1, 
    backgroundColor: 'transparent', 
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: 'black',
  },
  SignupButton:{
    alignItems:"center",
    

  },
  loginButton: {
    backgroundColor: '#FEE500',
    padding: 2,
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop:30,
    marginBottom: 10,
    borderRadius: 15,
  },
  loginEmailButton :{
    backgroundColor:"black",
    padding:15,
    alignItems: "center",
    marginHorizontal:40,
    borderRadius: 15,
    marginBottom:20,

  },
  loginText:{
    color:"white",
    fontWeight:'bold',

  },
  
  kakaoSymbol: {
    width: "100%",  
    height: undefined, 
    aspectRatio: 6, 
    resizeMode: 'contain',
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000D9', 
  }
});

export default OnboardingScreen;
