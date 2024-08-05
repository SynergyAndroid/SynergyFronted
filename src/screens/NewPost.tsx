import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleSubmit = () => {
        if (title.trim() === '' || content.trim() === '') { 
            Alert.alert('오류', '제목과 내용을 입력해주세요!');
            return;
        }
        Alert.alert('주의', '특정 종교 모임 권유, 물건 판매 행위 등 커뮤니티 규칙을 위반한 글은 삭제조치 될 수 있습니다.');

        setTitle('');
        setContent('');
    }

    return (
        <View style={styles.container}>
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
                color={'#E0BACB'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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