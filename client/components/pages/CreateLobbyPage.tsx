import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkAction';
import { setCountThunk } from '../../features/redux/slices/game/countThunk';
import { BackHandler } from 'react-native';

export default function CreateLobbyPage({ navigation }): JSX.Element {
  const [count, setCount] = useState('');
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutThunk());
    navigation.navigate('Registration');
  };

  const createGameHandler = () => {
    if (count === '' || parseInt(count) < 4) {
      alert('Введите число игроков 4 или больше');
      return;
    }
    try {
      dispatch(setCountThunk({ count }));
      navigation.navigate('Lobby');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('ProfilePage')}
        title="Профиль"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TextInput
        style={styles.input}
        value={count}
        onChangeText={setCount}
        placeholder="введите кол-во игроков"
        keyboardType="numeric"
      />
      <Button
        onPress={createGameHandler}
        title="Создать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('TakePartPage')}
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
