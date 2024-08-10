import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';

// 가상의 채팅 데이터
const initialChatData = [
  { id: '1', name: '한태진', lastMessage: '안녕하세염', date: new Date().toLocaleDateString() },
  { id: '2', name: '김혜정', lastMessage: '메롱', date: new Date().toLocaleDateString() },
];

const ChatList = () => {
  const [chatData, setChatData] = useState(initialChatData);
  const navigation = useNavigation();

  const deleteChat = (rowKey) => {
    const newData = chatData.filter(item => item.id !== rowKey);
    setChatData(newData);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('채팅', { chatId: item.id, name: item.name })}
    >
      <Icon
        name="smileo"
        size={24}
        style={{ marginRight: 10 }}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          Alert.alert(
            '삭제 확인',
            '이 채팅방을 삭제하시겠습니까?',
            [
              { text: '취소', onPress: () => {}, style: 'cancel' },
              { text: '삭제', onPress: () => deleteChat(data.item.id) }
            ]
          );
        }}
      >
        <Icon name="delete" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={chatData}
        renderItem={renderChatItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}  // 스와이프하여 드러날 뷰의 너비 설정
        keyExtractor={item => item.id}
        disableRightSwipe  // 오른쪽으로 스와이프 방지
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default ChatList;
