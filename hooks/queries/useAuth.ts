//회원가입 훅

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { postSignup } from "../../src/api/auth";
import { UseMutationCustomoptions } from "../../types/common";




function useSignup (mutationOptions?: UseMutationCustomoptions ) {
    return useMutation({
        mutationFn:postSignup,
        ...mutationOptions,

        
    });
};

function useLogin(){ 
    return useMutation({
        mutationFn:postLogin,
        onSuccess:({accessToken,refreshToken})=> {
            setEncryptStorage( ) // 8 분 4초 
        }
    })
}



//요청이 성공했을 때 onsuccess 함수나 
//요청이 실패했을 때 onError 함수가 있다 
 // 성공 실패와 관련없이 실행할 수 ㅇ있는 onSettled 함수를 가지고 있다. 
 // 여기서는 하나씩 지정해주는 게 아니라 options 들을 인자로 받아서 설정해주고자 했다. 
 // 옵션들은 객체로 받아줄 수 있다. 
