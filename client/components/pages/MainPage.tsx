import React from 'react';
import { Button, Text, View } from 'react-native';

export default function MainPage({ navigation }): JSX.Element {
  console.log(navigation);
  
  return (
    <View>
      <Text> MainPage</Text>
      <Button
        onPress={() => navigation.navigate('Registration')}
        title="Зарегистрироваться"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('Autorization')}
        title="Авторизация"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        <Button
        onPress={() => navigation.navigate('ResultPage')}
        title="ResultPage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
       <Button
        onPress={() => navigation.navigate('ProfilePage')}
        title="ProfilePage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
