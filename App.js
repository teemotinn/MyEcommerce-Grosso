import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Navigator from './src/navigation/Navigator';


export default function App() {

  const [fontsLoaded] = useFonts({
    'Nunito': require('./src/assets/fonts/Nunito/Nunito-Regular.ttf'),
    'NunitoBold': require('./src/assets/fonts/Nunito/Nunito-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
})
