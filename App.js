import { StyleSheet, View } from 'react-native';
import MyHeader from './src/components/Header';
import { colors } from './src/global/colors';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <MyHeader />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
});
