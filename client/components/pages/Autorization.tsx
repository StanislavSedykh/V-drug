import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Autorization({ navigation }): JSX.Element {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="имя/name"
      />
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="пароль/password"
      />
      <Button
        onPress={() => navigation.navigate('CreateLobbyPage')}
        title="Войти"
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
