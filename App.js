import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux';
import store from './src/store/store';


export default function App() {

  const [fontsLoaded] = useFonts({
    'Nunito': require('./src/assets/fonts/Nunito/Nunito-Regular.ttf'),
    'NunitoBold': require('./src/assets/fonts/Nunito/Nunito-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
})
