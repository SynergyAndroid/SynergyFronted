import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/LoginIng';
import SignScreen from '../screens/SignUp/SignScreen';
import OnboardingScreen from '../screens/onboarding/onboarding';
import Home from '../screens/Home';
import KakaoLogin from '../screens/SignUp/KakaoLogin';
import HowToUse from '../screens/HowToUse';
import Community from '../screens/Community/Community.tsx';
import Profile from '../screens/Profile/Profile.tsx';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';
import PostDetail from '../screens/Community/PostDetail.tsx';
import NewPost from '../screens/Community/NewPost.tsx';

// 각 화면의 이름과 그에 필요한 파라미터를 정의한 타입
type RootStackParamList = {
  OnboardingScreen: undefined;
  Login: undefined;
  SignScreen: undefined;
  Home: undefined;
  KakaoLogin: undefined;
  HowToUse: undefined;
  Community: undefined;
  Profile: undefined;
  Chat: undefined;
  ChatList: undefined;
  PostDetail: undefined;
  NewPost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function OnboardingNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignScreen"
        component={SignScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KakaoLogin"
        component={KakaoLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HowToUse"
        component={HowToUse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Community"
        component={Community}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
