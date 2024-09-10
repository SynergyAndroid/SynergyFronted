import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
//import BottomBar from '../components/bottom';
import Community from '../screens/Community';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';
import PostDetail from '../screens/PostDetail';
import OnboardingScreen from '../screens/onboarding/onboarding';
import UserInfo from '../screens/SignUp/UserInfo';
import SignUpComplete from '../screens/SignUp/SignUpComplete';
import Login from '../screens/Login';
import ApiPractice from '../screens/ApiPractice';
import HowToUse from '../screens/HowToUse';



const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="온보딩화면">
        <Stack.Screen name="온보딩화면" component={OnboardingScreen} options={{headerShown:false}} />
        <Stack.Screen name="홈" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="새로운 글 작성" component={NewPost} options={{headerShown:false}} />
        <Stack.Screen name="커뮤니티" component={Community} options={{headerShown:false}} />
        <Stack.Screen name="상세글 보기" component={PostDetail}  />
        <Stack.Screen name="프로필" component={Profile} />
        <Stack.Screen name="채팅" component={Chat} options={{headerShown:false}}/>
        <Stack.Screen name="채팅목록" component={ChatList}  options={{headerShown:false}}/>
        <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpComplete" component={SignUpComplete} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ApiPracitce" component={ApiPractice} options={{ headerShown: false }} />
        <Stack.Screen name="HowToUse" component={HowToUse} options={{ headerShown: false }} />
      </Stack.Navigator>
  
    </>
  );
}

export default AppNavigator;
