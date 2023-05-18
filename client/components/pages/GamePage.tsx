import React from 'react';
import { Button, Text, View } from 'react-native';

export default function GamePage({ navigation }): JSX.Element {
  return (
    <View>
      <Text>Раунд 1 из 6</Text>
      <Text>Я выебал собаку</Text>
      <Button
        onPress={() => navigation.navigate('///')}
        title="Таня"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('///')}
        title="Рома"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
