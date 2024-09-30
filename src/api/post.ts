import axiosInstance from './axios';

// Post 인터페이스에 author 정보 추가
export interface Post {
  id: number;
  title: string;
  content: string;
  createDate: string;
  replyList: Comment[];
  authorId: number;
  authorName: string; // 작성자의 이름
}

// Comment 인터페이스
export interface Comment {
  id: number;
  content: string;
  createDate: string;
  authorId: number;
  authorName: string; // 댓글 작성자의 이름
}

// 커뮤니티 게시물 가져오기
export const getCommunityPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('/community/list');
  return response.data?.content || [];
};

// 커뮤니티 게시물 생성
export const createCommunityPost = async (post: {
  title: string;
  content: string;
  authorId: number; // 글 작성자의 ID 추가
}): Promise<Post> => {
  const response = await axiosInstance.post('/community/create', post);
  return response.data;
};

// 댓글 생성
export const createComment = async (
  postId: number,
  content: string,
  authorId: number, // 댓글 작성자의 ID 추가
): Promise<Comment> => {
  const response = await axiosInstance.post(`/reply/create/${postId}`, {
    content,
    authorId, // 댓글 작성자의 ID 추가
  });
  return response.data;
};
