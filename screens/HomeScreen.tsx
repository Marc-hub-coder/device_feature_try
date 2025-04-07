import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { loadEntries, saveEntries } from '../utils/storage';
import { TravelEntry } from '../types/entry';
import EntryItem from '../components/EntryItem';

export default function HomeScreen() {
  const [entries, setEntries] = useState<TravelEntry[]>([]);

  useEffect(() => {
    (async () => {
      const loaded = await loadEntries();
      setEntries(loaded);
    })();
  }, []);

  const removeEntry = async (id: string) => {
    const updated = entries.filter(entry => entry.id !== id);
    setEntries(updated);
    await saveEntries(updated);
  };

  return (
    <View>
      {entries.length === 0 ? (
        <Text>NO ENTRIES YET</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EntryItem entry={item} onRemove={removeEntry} />
          )}
        />
      )}
    </View>
  );
}
