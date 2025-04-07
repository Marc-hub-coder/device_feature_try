import React, { useState } from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import uuid from 'react-native-uuid';
import { saveEntries, loadEntries } from '../utils/storage';
import { getAddressFromCoords } from '../utils/geolocation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';

type AddEntryScreenProps = BottomTabScreenProps<BottomTabParamList, 'AddEntry'>;

export default function AddEntryScreen({ navigation }: AddEntryScreenProps) {
  const [image, setImage] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      const coords = await Location.getCurrentPositionAsync({});
      const addr = await getAddressFromCoords(coords.coords.latitude, coords.coords.longitude);
      setImage(result.assets[0].uri);
      setAddress(addr);
    }
  };

  const saveEntry = async () => {
    if (!image || !address) {
      Alert.alert('Validation', 'You must take a picture first.');
      return;
    }

    const newEntry = {
      id: uuid.v4().toString(),
      imageUri: image,
      address,
      timestamp: new Date().toLocaleString(),
    };

    const oldEntries = await loadEntries();
    await saveEntries([newEntry, ...oldEntries]);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Travel Entry Saved!',
        body: 'Your travel memory has been saved.',
      },
      trigger: null,
    });

    navigation.navigate('Home');
  };

  return (
    <View>
      <Button title="Take Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Save Entry" onPress={saveEntry} />
    </View>
  );
}
