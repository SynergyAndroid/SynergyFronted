import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewPost from '../screens/Community/NewPost.tsx';
import Community from '../screens/Community/Community.tsx';
import Profile from '../screens/Profile/Profile.tsx';
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';
import PostDetail from '../screens/Community/PostDetail.tsx';
import HowToUse from '../screens/HowToUse';
import {createStackNavigator} from '@react-navigation/stack';
import BottomBar from '../components/bottom.tsx';

// Post 타입을 정의합니다.
interface Post {
  id: number;
  title: string;
  content: string;
  replyList: Comment[];
}

export type RootStackParamList = {
  Home: undefined;
  NewPost: undefined;
  Community: undefined;
  PostDetail: {post: Post};
  Profile: undefined;
  Chat: undefined;
  ChatList: undefined;
  HowToUse: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator(): JSX.Element {
  return (
    <>
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
          name="HowToUse"
          component={HowToUse}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <BottomBar />
    </>
  );
}

export default AppNavigator;
