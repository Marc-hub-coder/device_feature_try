import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TravelEntry } from '../types/entry';
import { Ionicons } from '@expo/vector-icons'; 

type Props = {
  entry: TravelEntry;
  onRemove: (id: string) => void;
};

export default function EntryItem({ entry, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: entry.imageUri }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.address}>{entry.address}</Text>
        <Text style={styles.timestamp}>
          {new Date(entry.timestamp).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => onRemove(entry.id)}
      >
        <Ionicons name="trash" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
  },
});