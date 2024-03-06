import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, PermissionsAndroid, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [address, setAddress] = useState(null);

  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // Function to get the current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());
  };

  // Function to get location and address
  const getLocation = async () => {
    const permissionResult = await requestLocationPermission();

    if (permissionResult) {
      Geolocation.getCurrentPosition(
        async (position) => {
          setLocation(position);

          // Fetch address using reverse geocoding
          try {
            const apiKey = 's';
            const response = await fetch(
              "https://api.opencagedata.com/geocode/v1/json?q=" + res?.coords?.latitude + "%2C%20" + res?.coords?.longitude + "&key=15b1b1d3bfa642e58bce5355ecff681e&language=en&pretty=1"
              //`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
            );
            const data = await response.json();
            const firstResult = data.results[0];
            setAddress(firstResult.formatted);
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.log(error.code, error.message);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      getCurrentDateTime();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <Text>Address: {address}</Text>
      <Text>Current Date and Time: {currentDateTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;



// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Linking,
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';


// // Function to get permission for location
// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Geolocation Permission',
//         message: 'Can we access your location?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log('granted', granted);
//     if (granted === 'granted') {
//       console.log('You can use Geolocation');
//       return true;
//     } else {
//       console.log('You cannot use Geolocation');
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };
// const App = () => {
//   // state to hold location
//   const [location, setLocation] = useState(false);

//   //function to check current date and time
//   const [currentDateTime, setCurrentDateTime] = useState(null);

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     setCurrentDateTime(now.toLocaleString());
//   };

//   // function to check permissions and get Location
//   const getLocation = () => {
//     const result = requestLocationPermission();
//     result.then(res => {
//       console.log('res is:', res);
//       if (res) {
//         Geolocation.getCurrentPosition(
//           position => {
//             console.log(position);
//             setLocation(position);
//           },
//           error => {
//             // See error code charts below.
//             console.log(error.code, error.message);
//             setLocation(false);
//           },
//           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//         );
//       }
//     });
//     console.log(location);
//     getCurrentDateTime();
//   };
//   // Function to Send Location to twitter
//   // const sendLocation = () => {
//   //   try {
//   //     if (location) {
//   //       const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
//   //       const url = `https://twitter.com/intent/tweet?text=${tweet}`;
//   //       Linking.openURL(url);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   return (
//     <View style={styles.container}>
//       <Text>Welcome!</Text>
//       <View
//         style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
//         <Button title="Get Location" onPress={getLocation} />
//       </View>
//       <Text>Latitude: {location ? location.coords.latitude : null}</Text>
//       <Text>Longitude: {location ? location.coords.longitude : null}</Text>
//       <Text>Current Date and Time: {currentDateTime}</Text>
//       {/* <View
//         style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
//         <Button title="Send Location" onPress={sendLocation} />
//       </View> */}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// export default App;