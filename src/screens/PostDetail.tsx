import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

// 댓글 타입 정의
interface Comment {
  id: number;
  content: string;
}

// Post 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
  replyList: Comment[];
}

interface PostDetailProps {
  route: {
    params: {
      post: Post;
    };
  };
}

const PostDetail: React.FC<PostDetailProps> = ({route}) => {
  const {post} = route.params;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]); // 초기 댓글 목록을 빈 배열로 설정

  // 페이지 로드 시 댓글 목록을 가져오는 함수
  useEffect(() => {
    if (post.replyList) {
      setComments(post.replyList);
    }
  }, [post.replyList]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://172.30.1.64:9090/reply/create/${post.id}`,
          {
            content: newComment,
          },
        );

        if (response.status === 200) {
          console.log('댓글이 성공적으로 추가되었습니다.');
          setNewComment(''); // 댓글이 추가된 후 입력 필드 초기화

          // 새 댓글이 추가된 후 댓글 목록을 수동으로 업데이트
          const updatedComments = [
            ...comments,
            {id: response.data.id, content: newComment},
          ];
          setComments(updatedComments);
        } else {
          console.error('댓글 추가에 실패했습니다:', response.data);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>댓글 {comments.length}개</Text>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text>{comment.content}</Text>
            </View>
          ))
        ) : (
          <Text> 아직 아무런 댓글이 없습니다. </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>댓글 달기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  commentsContainer: {
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#005F40',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostDetail;
