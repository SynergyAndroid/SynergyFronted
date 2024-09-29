import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Community from '../screens/Community';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';
import PostDetail from '../screens/PostDetail';
import HowToUse from '../screens/HowToUse';

type RootStackParamList = {
  Home: undefined;
  NewPost: undefined;
  Community: undefined;
  PostDetail: undefined;
  Profile: undefined;
  Chat: undefined;
  ChatList: undefined;
  사용방법: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Community"
        component={Community}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="Profile" component={Profile} />
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
        name="사용방법"
        component={HowToUse}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
