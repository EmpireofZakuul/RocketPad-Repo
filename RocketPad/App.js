
import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { useFonts } from 'expo-font';
import { StatusBar } from "react-native";

function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
    <StatusBar
    barStyle="light-content"
    backgroundColor="transparent"
    translucent={true}
  />
    <MainContainer/>
    </>
  );
}

export default App;
