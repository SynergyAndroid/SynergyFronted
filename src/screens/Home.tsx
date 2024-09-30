import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import BottomBar from '../components/bottom';
import {useNavigation} from '@react-navigation/native';
import {REACT_APP_YUMMY, REACT_APP_ROAD, REACT_APP_TRIP} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../navigation';
import {StackNavigationProp} from '@react-navigation/stack';

// HomeScreenProp 타입 정의 (RootStackParamList의 'Home' 스크린에 대한 타입)
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('맛집'); // Default selection
  const [error, setError] = useState(null);
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const fetchApiData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      let url = '';

      switch (selectedCategory) {
        case '맛집':
          url = REACT_APP_YUMMY;
          break;
        case '산책길':
          url = REACT_APP_ROAD;
          break;
        case '여행':
          url = REACT_APP_TRIP;
          break;
        default:
          url = '';
          break;
      }

      try {
        const response = await axios.get(url);

        const fetchedItems = response.data.response.body.items.item;
        setItems(fetchedItems);
      } catch (error) {
        console.error('API 요청 오류:', error);
        setError(error);
      }
    };

    fetchApiData();
  }, [selectedCategory]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {item.firstimage ? (
        <Image source={{uri: item.firstimage}} style={styles.image} />
      ) : (
        <View style={styles.iconContainer}>
          <FontAwesome name="file-image-o" size={50} color="#ccc" />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.addr1}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.topSection}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HowToUse')}
                style={styles.notification}>
                <Icon name="list" size={25} color="black" />
              </TouchableOpacity>

              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>
                  안녕하세요 {username ? `${username}님!` : '회원님'}!
                </Text>
                <Text style={styles.subGreetingText}>
                  우리 오늘은 어디로 떠나볼까요?
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.removeItem('username'); // 로그아웃 처리
                    setUsername(null); // 상태 업데이트
                    navigation.navigate('Login'); // 로그인 화면으로 이동
                  }}
                  style={styles.logoutButton}>
                  <Text>로그아웃</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 카테고리 탭 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  selectedCategory === '맛집' && styles.selectedTab,
                ]}
                onPress={() => setSelectedCategory('맛집')}>
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === '맛집' && styles.selectedTabText,
                  ]}>
                  내 근처 맛집
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  selectedCategory === '산책길' && styles.selectedTab,
                ]}
                onPress={() => setSelectedCategory('산책길')}>
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === '산책길' && styles.selectedTabText,
                  ]}>
                  내 근처 산책길
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  selectedCategory === '여행' && styles.selectedTab,
                ]}
                onPress={() => setSelectedCategory('여행')}>
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === '여행' && styles.selectedTabText,
                  ]}>
                  내 근처 여행
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.contentid.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  notification: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 1,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ECF5E0',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    width: '100%',
    marginBottom: 30,
    position: 'relative',
  },
  greetingContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  greetingText: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#000',
  },
  subGreetingText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // 탭을 균등하게 배치
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#ddd', // 탭 아래 구분선을 넣어줌
    borderBottomWidth: 1,
  },
  categoryTab: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2, // 선택된 탭에 밑줄 추가
    borderBottomColor: '#7d965e', // 선택된 탭의 밑줄 색상 (초록색)
  },
  tabText: {
    fontSize: 15,
    color: 'black', // 기본 텍스트 색상
  },
  selectedTabText: {
    color: '#000', // 선택된 탭의 텍스트 색상
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  iconContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#999',
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Home;
