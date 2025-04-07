import React from 'react';
import { Button, Text, View } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Travel Diary</Text>
      <Button title="Open App" onPress={() => navigation.replace('Main')} />
    </View>
  );
}
