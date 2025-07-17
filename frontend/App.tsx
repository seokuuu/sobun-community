import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import GroupListScreen from './src/screens/GroupListScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          // 로그인하지 않은 사용자용 화면
          <>
            <Stack.Screen name="Login" options={{ title: '로그인' }}>
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: '회원가입' }}
            />
          </>
        ) : (
          // 로그인한 사용자용 화면
          <>
            <Stack.Screen
              name="GroupList"
              component={GroupListScreen}
              options={{ title: '소분모임' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}