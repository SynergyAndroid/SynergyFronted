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

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('맛집'); // Default selection
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApiData = async () => {
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
                onPress={() => navigation.navigate('사용방법')}
                style={styles.notification}>
                <Icon name="list" size={25} color="black" />
              </TouchableOpacity>

              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>안녕하세요 혜원님!</Text>
                <Text style={styles.subGreetingText}>
                  우리 오늘은 어디로 떠나볼까요?
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === '맛집' && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategory('맛집')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedCategory === '맛집' && styles.selectedButtonText,
                  ]}>
                  내 근처 맛집
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === '산책길' && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategory('산책길')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedCategory == '산책길' && styles.selectedButtonText,
                  ]}>
                  내 근처 산책길
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === '여행' && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategory('여행')}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedCategory == '여행' && styles.selectedButtonText,
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
  mapImage: {
    width: 140,
    height: 200,
    marginRight: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  selectedButton: {
    backgroundColor: '#7d965e',
  },
  buttonText: {
    fontSize: 15,
    //fontWeight:"bold",
    color: '#000',
  },
  selectedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    overflow: 'hidden',
    //elevation: 2,
    //shadowColor: "black",
    //shadowOffset: { width: 0, height: 2 },
    ///shadowOpacity: 0.3,
    //shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  iconContainer: {
    width: '100%',
    height: 150,
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
