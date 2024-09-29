import React, { useState } from "react";
import useAuth from "../../../hooks/queries/useAuth";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import WebView, { WebViewMessageEvent, WebViewNavigation } from "react-native-webview";
import axios from 'axios'; // axios import 추가

const REDIRECT_URI = `https://172.21.73.166:9090/oauth/kakao/callback`;
const KAKAO_REST_API_KEY = `89a1a373df888fa03ee6086agita05eb30f`;

function KakaoLogin() {
    const { kakaoLoginMutation } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isChangeNavigate, setIsChangeNavigate] = useState(true);

    const handleOnMessage = (event: WebViewMessageEvent) => {
        if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
            const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
            requestToken(code);
        }
    };

    const requestToken = async (code: string) => {
        const response = await axios({
            method: 'post',
            url: "https://kauth.kakao.com/oauth/token",
            params: {
                grant_type: 'authorization_code',
                client_id: KAKAO_REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code,
            },
        });
        kakaoLoginMutation.mutate(response.data.access_token); // 토큰 받아온 후 처리
    };

    const handleNavigationChangeState = (event: WebViewNavigation) => {
        const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
        setIsLoading(isMatched);
        setIsChangeNavigate(event.loading);
    };

    return (
        <SafeAreaView>
            {(isLoading || isChangeNavigate) && (
                <View>
                    <ActivityIndicator size={'small'} color={'black'} />
                </View>
            )}
            <WebView
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
                }}
                onMessage={handleOnMessage}
                injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
                onNavigationStateChange={handleNavigationChangeState}
            />
        </SafeAreaView>
    );
}

export default KakaoLogin;
