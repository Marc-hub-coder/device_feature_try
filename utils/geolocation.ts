import * as Location from 'expo-location';

export const getAddressFromCoords = async (lat: number, lon: number): Promise<string> => {
  const [place] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
  return `${place.name || ''}, ${place.city || ''}, ${place.region || ''}`;
};
