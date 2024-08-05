import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Appnavigation from './src/navigation/index';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Appnavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;