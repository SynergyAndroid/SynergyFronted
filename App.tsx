import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store'; // Redux 스토어를 가져옵니다

import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Failed to load launch status:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // 로딩 스크린 또는 null 반환
  }

  return (
    <Provider store={store}> 
      <SafeAreaView style={styles.container}>
        {isFirstLaunch ? <OnboardingNavigator /> : <AppNavigator />}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
