import React from 'react';
import AppNavigator from './AppNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import useAuth from '../../hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth(); // 로그인 상태 가져오기

  return <>{isLogin ? <AppNavigator /> : <OnboardingNavigator />}</>;
}

export default RootNavigator;
