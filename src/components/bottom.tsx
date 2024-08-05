import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState('홈');
  const navigation = useNavigation();

  const tabs = [
    { name: '홈', icon: 'home', screen: 'Home' },
    { name: '커뮤니티', icon: 'team', screen: 'Community' },
    { name: '글 작성', icon: 'pluscircleo', screen: 'NewPost' },
    { name: '채팅', icon: 'mail', screen: 'Chats' },
    { name: '프로필', icon: 'user', screen: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            setSelectedTab(tab.name);
            navigation.navigate(tab.screen);
          }}
          style={styles.tabItem}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={selectedTab === tab.name ? '#E0BACB' : '#000'}
          />
          <Text
            style={[
              styles.labelStyle,
              selectedTab === tab.name && styles.selectedLabelStyle,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopColor: 'black',
    backgroundColor: 'white',
    
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  selectedLabelStyle: {
    color: '#E0BACB',
  },
});

export default BottomBar;