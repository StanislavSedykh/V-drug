import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Autorization(): JSX.Element {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
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