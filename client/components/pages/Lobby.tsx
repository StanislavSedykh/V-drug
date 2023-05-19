import React from 'react';
import { Button, Text, View } from 'react-native';

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

export default function Lobby({ navigation }): JSX.Element {
  return (
    <View>
      {pseudoBase.map((el) => <Text key={el.id}>{el.name}</Text>)}
      <Button
        onPress={() => navigation.navigate('FactPage')}
        title="Начать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('CreateLobbyPage')}
        title="Отменить"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
