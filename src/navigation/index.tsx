import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import NewPost from '../screens/NewPost';
import BottomBar from '../components/bottom';
import Community from '../screens/Community';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="홈" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="회원가입" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="로그인" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="새로운 글 작성" component={NewPost} />
        <Stack.Screen name="커뮤니티" component={Community} />
        <Stack.Screen name="프로필" component={Profile} />
        <Stack.Screen name="채팅" component={Chat} />
        <Stack.Screen name="채팅목록" component={ChatList} />
      </Stack.Navigator>
      <BottomBar />  
    </>
  );
}

function Appnavigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default Appnavigation;