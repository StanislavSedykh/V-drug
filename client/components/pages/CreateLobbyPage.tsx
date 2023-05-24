import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkAction';
import { setCountThunk, setPinThunk } from '../../features/redux/slices/game/countThunk';
import { socketInit } from '../../features/websocket/wsActions';
import { BackHandler } from 'react-native';
import { setupRoom } from '../../features/redux/slices/game/gameSlice';
import { joinGameAction } from '../../features/redux/slices/game/gameAction';

export default function CreateLobbyPage({ navigation }): JSX.Element {
  const [count, setCount] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(socketInit());
  }, []);

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
      dispatch(setupRoom({userid: user.id}))
      dispatch(setPinThunk());
      dispatch(joinGameAction(user))
      navigation.navigate('Lobby');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("ProfilePage")}
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
        onPress={() => createGameHandler()}
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
