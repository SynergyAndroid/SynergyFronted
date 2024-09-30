import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState<number | null>(null); // 작성자 ID를 저장할 상태
  const navigation = useNavigation();

  // AsyncStorage에서 authorId 가져오기
  useEffect(() => {
    const getAuthorId = async () => {
      try {
        const storedAuthorId = await AsyncStorage.getItem('authorId');
        if (storedAuthorId) {
          setAuthorId(Number(storedAuthorId)); // authorId를 상태로 설정
        }
      } catch (error) {
        console.error('작성자 ID를 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    getAuthorId();
  }, []);

  const handleSubmit = async () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('오류', '제목과 내용을 입력해주세요!');
      return;
    }

    if (!authorId) {
      Alert.alert(
        '오류',
        '작성자 정보를 불러오지 못했습니다. 다시 로그인해주세요.',
      );
      return;
    }

    Alert.alert(
      '주의*',
      '특정 종교 모임 권유, 물건 판매 행위 등 커뮤니티 규칙을 위반한 글은 삭제조치 될 수 있습니다.',
      [
        {
          text: '확인',
          onPress: async () => {
            try {
              const response = await axiosInstance.post('/community/create', {
                title: title,
                content: content,
                authorId: authorId, // 작성자 ID 추가
              });

              if (response.status === 200) {
                Alert.alert('성공', '글이 성공적으로 등록되었습니다!', [
                  {
                    text: '확인',
                    onPress: () => {
                      setTitle('');
                      setContent('');
                      navigation.navigate('Community');
                    },
                  },
                ]);
              } else {
                Alert.alert(
                  '오류',
                  '글 등록에 실패했습니다. 다시 시도해주세요.',
                );
              }
            } catch (error) {
              console.error(error);
              Alert.alert('오류', '서버와 통신 중 오류가 발생했습니다.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="black" />
      </TouchableOpacity>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
      />
      <Text style={styles.label}>내용</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        placeholder="내용을 입력하세요"
        multiline
      />
      <Button title="제출하기" onPress={handleSubmit} color={'#005F40'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
});

export default NewPost;
