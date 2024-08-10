import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from "react-native";
import { api } from '.././api/api';

const Profile = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // 프로필 정보 불러오기
        getProfileInfo();
    }, []);

    const getProfileInfo = async () => {
        try {
            const response = await api.getProfile();
            setName(response.name);
            setAge(response.age);
            setPhone(response.phone);
            setLocation(response.location);
            setProfileImage(response.profileImage);
        } catch (error) {
            Alert.alert("에러", "프로필 정보를 불러오는데 실패했습니다.");
        }
    };

    const handleSave = async () => {
        try {
            await api.updateProfile({
                name,
                age,
                phone,
                location,
                profileImage
            });
            Alert.alert("성공", "프로필이 업데이트되었습니다.");
            setIsEditing(false);
        } catch (error) {
            Alert.alert("에러", "프로필 저장에 실패했습니다.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}님의 프로필</Text>
            </View>

            <View style={styles.profileSection}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <TouchableOpacity onPress={() => Alert.alert("알림", "사진 변경 기능은 아직 구현되지 않았습니다.")}>
                    <Text style={styles.changePhotoText}>사진 바꾸기</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
                <Text>이름: {isEditing ? <TextInput value={name} onChangeText={setName} /> : name}</Text>
                <Text>나이: {isEditing ? <TextInput value={age} onChangeText={setAge} keyboardType="numeric" /> : age}</Text>
                <Text>전화번호: {isEditing ? <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" /> : phone}</Text>
                <Text>위치: {isEditing ? <TextInput value={location} onChangeText={setLocation} /> : location}</Text>
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
                <Text style={styles.buttonText}>
                    {isEditing ? "저장하기" : "프로필 수정하기"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoText: {
        color: '#E0BACB',
        marginTop: 10,
    },
    infoSection: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#E0BACB',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Profile;