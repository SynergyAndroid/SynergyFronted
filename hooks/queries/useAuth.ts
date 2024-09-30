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
      // 409 오류일 때 적절한 메시지 출력
      if (error.response?.status === 409) {
        Alert.alert('회원가입 실패', '이미 존재하는 이메일입니다.');
      } else {
        // 그 외의 오류는 기본 메시지 출력
        Alert.alert(
          '회원가입 실패',
          error.response?.data?.message || '회원가입 중 문제가 발생했습니다.',
        );
      }
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
      // 409 에러에 대한 처리 추가
      if (error.response?.status === 409) {
        Alert.alert('로그인 실패', '이미 존재하는 사용자 정보입니다.');
      } else {
        console.error('로그인 오류:', error);
        Alert.alert(
          '로그인 실패',
          '사용자 이름 또는 비밀번호가 올바르지 않습니다.',
        );
      }
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
