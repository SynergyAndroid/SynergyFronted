import { useMutation, useQuery, useQueryClient, MutationFunction } from "@tanstack/react-query";
import { postSignup, postLogin, getAccessToken, getProfile, kakaoLogin } from "../../src/api/auth"; // kakaoLogin 추가
import { getEncryptStorage, removeEncryptStorage, setEncryptStorage } from "../../utils/encryptStorage";
import axiosInstance from "../../src/api/axios";
import { setHeader, removeHeader } from "../../utils/headers";
import { useEffect } from "react";
import { queryKeys, storageKeys } from "../../src/navigation";
import { UseMutationCustomOptions } from "../../types/common"; // UseMutationCustomOptions로 수정

// 회원가입 훅
function useSignup() {
    return useMutation({
        mutationFn: postSignup,
        onError: (error) => {
            console.error(error.response?.data?.message); // 에러 메시지 출력
        },
    });
}

// 로그인 훅
function useLogin<T>(
    loginAPI: MutationFunction<ResponseToken, T>, // ResponseToken 타입 정의 필요
    mutationOptions?: UseMutationCustomOptions, // 오타 수정
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginAPI,
        onSuccess: ({ accessToken, refreshToken }) => {
            setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken); // refreshToken 저장
            setHeader('Authorization', `Bearer ${accessToken}`); // Authorization 헤더 설정
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        },
        onSettled: () => {
            // accessToken 갱신 후 관련 쿼리들 다시 가져오기
            queryClient.refetchQueries({ queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE] });
        },
        ...mutationOptions, // 오타 수정
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

// refreshToken 으로 accessToken 갱신하는 훅
function useGetRefreshToken() {
    const { data, isSuccess, isError } = useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 30분
        refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3, // 30분 주기로 갱신
        refetchOnReconnect: true, // 재연결 시 refetch
        refetchIntervalInBackground: true, // 백그라운드에서 리페치 활성화
    });

    useEffect(() => {
        if (isSuccess && data) {
            setHeader('Authorization', `Bearer ${data.accessToken}`); // accessToken 설정
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken); // refreshToken 저장
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            removeHeader('Authorization'); // Authorization 헤더 제거
            removeEncryptStorage(storageKeys.REFRESH_TOKEN); // refreshToken 삭제
        }
    }, [isError]);

    return { isSuccess, isError };
}

// 프로필 조회 훅
function useGetProfile(options = {}) {
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...options,
    });
}

// 인증 상태 관리 훅
function useAuth() {
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
       enabled: refreshTokenQuery.isSuccess, // 불필요한 마침표 제거 완료
    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useEmailLogin();
    const kakaoLoginMutation = useKakaoLogin();
    // const logoutMutation = useLogout(); // 필요 시 구현

    return {
        signupMutation,
        loginMutation,
        isLogin,
        getProfileQuery,
        kakaoLoginMutation,
    };
}

export default useAuth;







/*
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postSignup, postLogin, getAccessToken, getProfile } from "../../src/api/auth";
import { getEncryptStorage, removeEncryptStorage, setEncryptStorage } from "../../utils/encryptStorage";
import axiosInstance from "../../src/api/axios";
import { setHeader, removeHeader } from "../../utils/headers";

import { useEffect,useState } from "react";
import { UseMutationCustomoptions } from "../../types/common";

// 회원가입 훅
function useSignup() {
    return useMutation({
        mutationFn: postSignup,
        onError: (error) => {
            console.error(error.response?.data?.message); // 에러 메시지 출력
        },
    });
}

// 로그인 훅
function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postLogin,
        onSuccess: ({ accessToken, refreshToken }) => {
            setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken); // refreshToken 저장
            setHeader('Authorization', `Bearer ${accessToken}`); // Authorization 헤더 설정
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        },
        onSettled: () => {
            // accessToken 갱신 후 관련 쿼리들 다시 가져오기
            queryClient.refetchQueries({ queryKey: ['auth', queryKeys.GET_ACCESS_TOKEN] });
            queryClient.invalidateQueries({ queryKey: ['auth', queryKeys.GET_PROFILE] });
        },
    });
}

// refreshToken 으로 accessToken 갱신하는 훅
function useGetRefreshToken() {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ['auth', queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 30분
        refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3, // 30분 주기로 갱신
        refetchOnReconnect: true, // 재연결 시 refetch
        refetchIntervalInBackground: true, // 백그라운드에서 리페치 활성화
    });

    useEffect(() => {
        if (isSuccess && data) {
            setHeader('Authorization', `Bearer ${data.accessToken}`); // accessToken 설정
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken); // refreshToken 저장
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            removeHeader('Authorization'); // Authorization 헤더 제거
            removeEncryptStorage(storageKeys.REFRESH_TOKEN); // refreshToken 삭제
        }
    }, [isError]);

    return { isSuccess, isError };
}

// 프로필 조회 훅
function useGetProfile() {
    return useQuery({
        queryKey: ['auth', queryKeys.GET_PROFILE],
        queryFn: getProfile,
    });
}*/

//로그아웃
/*
function useLogout(mutationOptions:UseMutationCustomoptions){
    return useMutation({
        mutationFn: logout,
        onSuccess:()=>{
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:['auth']});
        },
        ...mutationOptions
       
    });

}
*/

/*
// 인증 상태 관리 훅
function useAuth() {
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
       enabled: refreshTokenQuery.isSuccess,

    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    //const logoutMutation = useLogout();

    return {
        signupMutation,
        loginMutation,
        isLogin,
        getProfileQuery,
    };
}
/*
/*

    useEffect(() => {
        // 앱이 실행될 때 로컬 스토리지에서 토큰을 확인
        const checkLoginStatus = async () => {
            try {
                const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
                if (refreshToken) {
                    // 토큰이 있으면 로그인된 상태로 간주
                    setIsLogin(true);
                } else {
                    // 토큰이 없으면 로그인되지 않은 상태로 간주
                    setIsLogin(false);
                }
            } catch (error) {
                console.error('로그인 상태 확인 중 오류:', error);
                setIsLogin(false);
            }
        };

        checkLoginStatus();
    }, []);

    return { isLogin }; // 로그인 상태만 반환
}

*/



