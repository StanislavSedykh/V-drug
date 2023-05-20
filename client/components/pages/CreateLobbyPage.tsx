import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkAction';

export default function CreateLobbyPage({ navigation }): JSX.Element {
  const [number, setNumber] = useState('');
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logoutThunk());
    navigation.navigate('Registration')
  }
  return (
    <View>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="введите кол-во игроков"
        keyboardType="numeric"
      />
      <Button
        onPress={() => navigation.navigate('Lobby')}
        title="Создать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('Lobby')}
        title="Присоединиться к игре"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={logoutHandler}
        title="Выйти"
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
