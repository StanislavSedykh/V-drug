import React, { useEffect, useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import {
  deleteGameThunk,
  setPinThunk,
} from "../../features/redux/slices/game/countThunk";
import { updateGameStatus } from "../../features/redux/slices/game/gameSlice";
import { startGameAction } from "../../features/redux/slices/game/gameAction";
import ButtonStandart from "../UI/ButtonStandart";
import { API_URL } from "@env";

export default function Lobby({ navigation }): JSX.Element {
  const [changeStatus, setChangeStatus] = useState(false);
  const { allPlayers, status} = useAppSelector((state) => state.game);
  const creatorId = useAppSelector((state) => state.game.userid);
  const dispatch = useAppDispatch();
  const { pin } = useAppSelector((state) => state.pin);
  const {id} = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'ChooseFacts') {
      navigation.navigate('FactPage');
    }
  }, [status]);
 
  useEffect(() => {
    dispatch(updateGameStatus("PlayerFind"));
  }, []);

  const deleteHandler = () => {
    dispatch(deleteGameThunk());
    navigation.navigate("CreateLobbyPage");
  };

  return (
    <View style={styles.container} >
      {allPlayers.map((el) => (
        <View key={el.id}>
          <Image
            style={styles.avatar}
            source={{uri:  `http://${
              Platform.OS === 'android' || Platform.OS === 'ios'
                ? API_URL
                : 'localhost'
            }:3001/${el.image}`,}}
          />
          <Text style={styles.playerName}>{el.name}</Text>
        </View>
      ))}
      {creatorId === id && (<><Text style={styles.pin}>Ваш PIN: {pin}</Text>
      
      <ButtonStandart
        onPress={() => dispatch(startGameAction('ChooseFacts'))}
        title="Начать игру"
      /></>)
    }
      
      <ButtonStandart
        onPress={deleteHandler}
        title="Отменить"
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
    padding: 20,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 50,
    borderColor: 'green',
    borderWidth: 3,
    backgroundColor: 'white',
    marginBottom: 10
  },
  playerName: {
    fontSize: 18,
    marginBottom: 20
  },
  pin: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
});