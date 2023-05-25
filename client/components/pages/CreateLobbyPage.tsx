import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkAction';
import { setCountThunk, setPinThunk } from '../../features/redux/slices/game/countThunk';
import { socketInit } from '../../features/websocket/wsActions';
import { BackHandler } from 'react-native';
import { setupRoom } from '../../features/redux/slices/game/gameSlice';
import { joinGameAction } from '../../features/redux/slices/game/gameAction';
import ButtonStandart from '../UI/ButtonStandart';
import TextInputStandart from '../UI/TextInputStandart';

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
      <ButtonStandart
        onPress={() => navigation.navigate('ProfilePage')}
        style={styles.profileButton}
        title="👤"
      />
      <TextInputStandart
        value={count}
        onChangeText={setCount}
        placeholder="введите кол-во игроков"
        keyboardType="numeric"
      />
      <ButtonStandart
        onPress={createGameHandler}
        title="Создать игру"
      />
      <ButtonStandart
        onPress={() => navigation.navigate('TakePartPage')}
        title="Присоединиться к игре"
      />
      <ButtonStandart
        onPress={logoutHandler}
        title="Выйти"
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
  profileButton: {
    position: 'absolute',
    top: 0,
    left: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2 ,
    borderColor: '#808080',
    backgroundColor: '#00bfff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
});
