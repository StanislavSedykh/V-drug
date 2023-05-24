import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ButtonStandart from '../UI/ButtonStandart';

export default function GamePage({ navigation }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Раунд 1 из 6</Text>
      <Text style={styles.text1}>Собака пробежала</Text>
      <ButtonStandart
        onPress={() => navigation.navigate('///')}
        title="Таня"
      />
      <ButtonStandart
        onPress={() => navigation.navigate('///')}
        title="Рома"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text:{
    position: 'absolute', top: '10%', 
    marginTop: 2, fontStyle: 'italic', color: '#000000', fontSize: 30
  },
  text1:{
    position: 'absolute', top: '15%', 
    marginTop: 2, fontStyle: 'italic', color: '#000000', fontSize: 30,
  }
});