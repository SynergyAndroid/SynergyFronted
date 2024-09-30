//inputfield 연습하기 

import React from "react";
import {StyleSheet, TextInput, View,TextInputProps,Text} from 'react-native';
import { useRef } from "react";
import { Pressable } from 'react-native';

//크기 대응하기m -> Dimensions 이용하기 
//const deviceHeight = Dimensions.get('screen').height;

interface InputFieldProps extends TextInputProps {
    disabled?:boolean;
    error?:string;
    touched?:boolean;

}

function InputField({disabled,error,touched, ...props}:InputFieldProps) {

    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () => {
        innerRef.current?.focus();
    };

    return (
        <Pressable onPress={handlePressInput}>
        <View style={styles.inputBox}>
            <TextInput 
            editable={!disabled} //disabled 가 아닌 상태일 때 textinput 창 활성화.. 
            // 즉 disabled 일때는 읽기 전용모드임 
            autoCapitalize="none" //자동대문자 방지
            spellCheck={false} // 스펠링교정 방지
            autoCorrect={false}  //자동문자추천 방지 
            
            // props 가 마지막에 위치해야 여러 속성 처리한다는 것임.. 
            {...props} >  
            </TextInput>
            
            {touched && Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
            

        </View>
        </Pressable>
    )
};

const styles=StyleSheet.create({
    errorText:{
        fontSize:10,
        color:'red',
    },
    inputBox: {
        borderWidth: 1,          // 테두리 두께
        borderColor: '#ccc',     // 테두리 색상
        borderRadius: 5,        // 모서리 둥글게
        backgroundColor: '#fff', // 배경색 흰색
        padding: 5,             // 안쪽 여백
        marginBottom: 10,        // 입력 필드 사이 간격
    },
    disabledInput: {
        backgroundColor: '#f0f0f0', // 비활성화 시 회색 배경
      },
 

})

export default InputField;