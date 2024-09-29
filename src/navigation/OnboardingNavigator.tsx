import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/LoginIng';
import SignScreen from '../screens/SignUp/SignScreen';
import OnboardingScreen from '../screens/onboarding/onboarding';
import Home from '../screens/Home';
import KakaoLogin from '../screens/SignUp/KakaoLogin';
import HowToUse from '../screens/HowToUse';

// 각 화면의 이름과 그에 필요한 파라미터를 정의한 타입
type RootStackParamList = {
  OnboardingScreen: undefined;
  Login: undefined;
  SignScreen: undefined;
  Home: undefined;
  KakaoLogin: undefined;
  HowToUse: undefined;
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
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
