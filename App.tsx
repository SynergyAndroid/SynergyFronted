import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <RootNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
