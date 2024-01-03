import React, { useState, useEffect } from 'react';
import { View, Button, PermissionsAndroid, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => console.log(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openDirection = () => {
    const currentLocation = `${latitude},${longitude}`;
    const destination = "Ayyappa Society, No.1-98/90/24, Opp IOC Petrol Pump, Madhapur, Megha Hills, Sri Sai Nagar, Madhapur, Telangana 500008";

    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex' }}>
      <View>
        <Button
          title="Get Current Location"
          onPress={() => {
            if (latitude && longitude) {
              console.log('Latitude: ', latitude);
              console.log('Longitude: ', longitude);
            } else {
              console.log('Location not available');
            }
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Get Directions" onPress={openDirection} />
      </View>
    </View>
  );
};

export default App;
