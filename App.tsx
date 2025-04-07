import React, { useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import BottomTabs from './navigation/BottomTabs';
import { requestAllPermissions } from './utils/permissions';
import { ThemeProvider } from './theme/ThemeContext';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    requestAllPermissions();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}