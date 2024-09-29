import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomBar from '../components/bottom';

interface Post {
  id: number;
  title: string;
  content: string;
  createDate: string;
  replyList: any[]; // 댓글 리스트의 구조에 따라 타입을 추가할 수 있습니다.
}

const Community: React.FC = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://172.30.1.64:9090/community/list',
        );
        // 서버에서 반환된 전체 데이터를 콘솔에 출력
        console.log('Response data:', response.data);

        const contentData = response.data?.content; // response.data 가 정의되어 있는지 확인

        if (Array.isArray(contentData)) {
          // contentData가 배열인지 확인
          const sortedPosts = contentData.sort(
            (a: Post, b: Post) =>
              new Date(b.createDate).getTime() -
              new Date(a.createDate).getTime(),
          );
          setPosts(sortedPosts);
        } else {
          setPosts([]);
        }
      } catch (error: any) {
        console.error('Error fetching posts:', error.message);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Request error:', error.message);
        }
        setPosts([]);
      }
    };

    fetchPosts(); // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  }, []);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 각 게시물을 렌더링하는 함수
  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail', {post})}>
        <View style={styles.profileContainer}>
          <View style={styles.profileIconContainer}>
            <Icon name="user" size={30} color="#fff" />
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorText}>작성자: {post.id}</Text>
            <Text style={styles.dateText}>{formatDate(post.createDate)}</Text>
          </View>
        </View>
        <Text style={styles.title}>{post.title || 'No Title'}</Text>
        <Text style={styles.content}>{post.content || 'No Content'}</Text>
      </TouchableOpacity>

      <View style={styles.replyContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetail', {post})}>
          <View style={styles.replyContent}>
            <Icon
              name="message1"
              size={20}
              color="#888"
              style={styles.replyIcon}
            />
            <Text style={styles.replyCount}>{post.replyList.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.firstContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        {posts.length > 0 ? (
          posts.map(renderPost)
        ) : (
          <Text>No posts available.</Text>
        )}
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  authorInfo: {
    flexDirection: 'column',
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#222',
  },
  content: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  replyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 5,
  },
  replyCount: {
    fontSize: 16,
    color: '#888',
  },
});

export default Community;
