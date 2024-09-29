// src/utils/storage.ts
/*
import AsyncStorage from '@react-native-async-storage/async-storage';

// 사용자 이름 저장
export const storeUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('username', username);
  } catch (error) {
    console.error('Error storing username:', error);
  }
};

// 사용자 이름 불러오기
export const getUsername = async (): Promise<string | null> => {
  try {
    const username = await AsyncStorage.getItem('username');
    return username; // username이 없으면 null 반환
  } catch (error) {
    console.error('Error getting username:', error);
    return null;
  }
};

// 사용자 이름 삭제 (로그아웃 시)
export const removeUsername = async () => {
  try {
    await AsyncStorage.removeItem('username');
  } catch (error) {
    console.error('Error removing username:', error);
  }
};
*/
// 일단 사용안함
