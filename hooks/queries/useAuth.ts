import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {postSignup, postLogin, kakaoLogin} from '../../src/api/auth';
import {setEncryptStorage} from '../../utils/encryptStorage';
import axiosInstance from '../../src/api/axios';
import {setHeader} from '../../utils/headers';
import {queryKeys, storageKeys} from '../../src/navigation';
import {UseMutationCustomOptions} from '../../types/common'; // UseMutationCustomOptions로 수정

// 회원가입 훅
function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onError: error => {
      console.error(error.response?.data?.message); // 에러 메시지 출력
    },
  });
}

// 로그인 훅
function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({accessToken, refreshToken, username}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken); // refreshToken 저장
      setHeader('Authorization', `Bearer ${accessToken}`); // Authorization 헤더 설정
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;

      // username을 AsyncStorage에 저장하는 부분 추가
      if (username) {
        await AsyncStorage.setItem('username', username);
      }

      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    onError: error => {
      console.error('로그인 오류:', error);
    },
    ...mutationOptions,
  });
}

// 이메일 로그인 훅
function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

// 카카오 로그인 훅
function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

// 인증 상태 관리 훅
function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
  };
}

export default useAuth;
