import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigation = useNavigation(); // useNavigation 훅 사용

    const handleSubmit = async () => {
        if (title.trim() === '' || content.trim() === '') { 
            Alert.alert('오류', '제목과 내용을 입력해주세요!');
            return;
        }

        // API 요청 전 경고 메시지를 보여주고, 확인 버튼을 눌러야 진행
        Alert.alert(
            '주의*',
            '특정 종교 모임 권유, 물건 판매 행위 등 커뮤니티 규칙을 위반한 글은 삭제조치 될 수 있습니다.',
            [
                {
                    text: '확인',
                    onPress: async () => {
                        // 서버에 POST 요청
                        
                        try {
                            const response = await axios.post('http://172.30.1.64:9090/community/create', {
                                title: title,
                                content: content,
                            });

                            if (response.status === 200) {
                                // 글이 성공적으로 등록되면 알림을 띄우고, community 페이지로 이동
                                Alert.alert('성공', '글이 성공적으로 등록되었습니다!', [
                                    {
                                        text: '확인',
                                        onPress: () => {
                                            setTitle('');
                                            setContent('');
                                            navigation.navigate('커뮤니티'); 
                                        }
                                    }
                                ]);
                            } else {
                                // 서버 오류 등의 이유로 실패한 경우
                                Alert.alert('오류', '글 등록에 실패했습니다. 다시 시도해주세요.');
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert('오류', '서버와 통신 중 오류가 발생했습니다.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons
                    name="arrow-back"
                    size={25}
                    color="black"
                />
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
            <Button 
                title="제출하기" 
                onPress={handleSubmit}
                color={'#005F40'}/>
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
