import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        title="Back to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
} 