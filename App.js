import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import store from './src/store/store'
import { dropTableSessions, init } from './src/SQLite';
import { useEffect } from 'react';

export default function App() {

  useEffect(()=> {
    init()
      .then((result)=> {
        console.log('Db initialized/dropped')
        console.log(result);
      })
      .catch(err => {
        console.log("Initialization DB failed:");
        console.log(err.message);
    })
  }, [])

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
