// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToLocationScreen = () => {
    navigation.navigate('Location');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Location Screen" onPress={navigateToLocationScreen} />
    </View>
  );
};

export default HomeScreen;
