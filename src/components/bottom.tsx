import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState('홈');
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state?.routes[state.index]?.name,
  );

  const tabs = [
    {name: '홈', icon: 'home', screen: 'Home'},
    {name: '커뮤니티', icon: 'people', screen: 'Community'},
    {name: '새로운 글 작성', icon: 'plus-circle', screen: 'NewPost'},
    {name: '채팅목록', icon: 'mail', screen: 'ChatList'},
    {name: '프로필', icon: 'person', screen: 'Profile'},
  ];

  useEffect(() => {
    if (currentRouteName) {
      const currentTab = tabs.find(tab => tab.screen === currentRouteName);
      if (currentTab) {
        setSelectedTab(currentTab.name);
      }
    }
  }, [currentRouteName]);

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            navigation.navigate(tab.screen);
          }}
          style={styles.tabItem}>
          <Icon
            name={tab.icon}
            size={24}
            color={selectedTab === tab.name ? '#005F40' : '#000'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
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
    //backgroundColor:"#7d965e",
    //borderRadius:30,
    //padding:10

    color: '#005F40',
    //backgroundColor:"#7d965e"
  },
});

export default BottomBar;
