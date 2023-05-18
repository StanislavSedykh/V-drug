import { StyleSheet, Text, View } from 'react-native';
import Registration from './components/pages/Registration';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
