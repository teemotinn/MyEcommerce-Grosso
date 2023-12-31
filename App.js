import { StatusBar, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import store from './src/store/store'
import { init } from './src/SQLite'
import { useEffect } from 'react'
import { colors } from './src/global/colors'

export default function App() {

  useEffect(() => {
    init()
      .then()
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  StatusBar.setBackgroundColor(colors.PRIMARY);
  StatusBar.setBarStyle('dark-content');

  const [fontsLoaded] = useFonts({
    'Nunito': require('./src/assets/fonts/Nunito/Nunito-Regular.ttf'),
    'NunitoBold': require('./src/assets/fonts/Nunito/Nunito-Bold.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
})
