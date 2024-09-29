import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {createComment, Post, Comment} from '../../api/post';

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
  const [comments, setComments] = useState<Comment[]>(post.replyList);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const newCommentResponse = await createComment(post.id, newComment, 1); // 현재 사용자 ID를 입력
        setComments([...comments, newCommentResponse]);
        setNewComment('');
      } catch (error) {
        console.error('댓글 추가 중 오류:', error);
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
              <Text style={styles.commentAuthor}>
                댓글 작성자: {comment.authorName}
              </Text>
              <Text>{comment.content}</Text>
            </View>
          ))
        ) : (
          <Text>아직 아무런 댓글이 없습니다.</Text>
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
  commentAuthor: {
    fontWeight: 'bold',
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
