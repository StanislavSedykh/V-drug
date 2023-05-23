import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';



export default function FactPage({ navigation }): JSX.Element {
  const [fact, setFact] = useState('');
  return (
    <View style={styles.container}>
      <TextInput value={fact} onChangeText={setFact} style={styles.input} />
      <Button
        onPress={() => navigation.navigate('GamePage')}
        title="Готов!"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
