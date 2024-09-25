import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../screens/LoginIng';
import SignScreen from '../screens/SignUp/SignScreen';
import OnboardingScreen from '../screens/onboarding/onboarding';
import Home from '../screens/Home';
import KakaoLogin from '../screens/SignUp/KakaoLogin';
import HowToUse from '../screens/HowToUse';



const Stack = createNativeStackNavigator();

function OnboardingNavigator() {
    return (
        <Stack.Navigator initialRouteName="OnboardingScreen">
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="로그인" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="카카오로그인" component={KakaoLogin} options={{headerShown:false}} />
            <Stack.Screen name="사용방법" component={HowToUse} options={{headerShown:false}} />

        </Stack.Navigator>
    );
}

export default OnboardingNavigator;
