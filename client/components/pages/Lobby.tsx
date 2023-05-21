import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import {
  deleteGameThunk,
  setPinThunk,
} from '../../features/redux/slices/game/countThunk';

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
  const dispatch = useAppDispatch();
  const { pin } = useAppSelector((state) => state.pin);
  const deleteHandler = () => {
    dispatch(deleteGameThunk());
    navigation.navigate('CreateLobbyPage');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setPinThunk());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View>
      {pseudoBase.map((el) => (
        <View key={el.id}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/favicon.png')}
          />
          <Text>{el.name}</Text>
        </View>
      ))}
      <Text>Ваш PIN: {pin}</Text>
      <Button
        onPress={() => navigation.navigate('FactPage')}
        title="Начать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={deleteHandler}
        title="Отменить"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
