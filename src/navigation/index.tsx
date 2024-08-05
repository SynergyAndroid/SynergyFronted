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
import Chats from '../screens/Chat';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chats" component={Chats} />
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