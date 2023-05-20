import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const pseudoBase = [
  {
    name: 'Vasya Pupkin',
    id: 1,
  },
  {
    name: 'Tapac',
    id: 2,
  },
  {
    name: 'Lyubitel Sobak',
    id: 3,
  },
  {
    name: 'Beb',
    id: 4,
  },
  {
    name: 'Bob',
    id: 5,
  },
];

export default function FactPage({ navigation }): JSX.Element {
  const [fact, setFact] = useState('');
  return (
    <View>
      {pseudoBase.map((el) => (
        <Text key={el.id}>{el.name}</Text>
      ))}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
