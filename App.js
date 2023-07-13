import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home';
import ItemListCategory from './src/screens/ItemListCategory';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { colors } from './src/global/colors';

export default function App() {

  const [categorySelected, setCategorySelected] = useState("")

  const [fontsLoaded] = useFonts({
    'Nunito': require('./src/assets/fonts/Nunito/Nunito-Regular.ttf'),
    'NunitoBold': require('./src/assets/fonts/Nunito/Nunito-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {
        categorySelected ?
          <ItemListCategory
            category={categorySelected}
            setCategory={setCategorySelected}
          /> :
          <Home
            setCategorySelected={setCategorySelected}
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND
  }
})
