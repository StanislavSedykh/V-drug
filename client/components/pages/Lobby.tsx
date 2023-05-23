import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import {
  deleteGameThunk,
  setPinThunk,
} from "../../features/redux/slices/game/countThunk";
import { updateGameStatus } from "../../features/redux/slices/game/gameSlice";

export default function Lobby({ navigation }): JSX.Element {
  const [changeStatus, setChangeStatus] = useState(false);
  const { allPlayers, roomPin, status } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);
  const creatorId = useAppSelector((state) => state.game.userid);
  const dispatch = useAppDispatch();
  const { pin } = useAppSelector((state) => state.pin);

  useEffect(() => {
    dispatch(updateGameStatus("PlayerFind"));
  }, []);

  const deleteHandler = () => {
    dispatch(deleteGameThunk());
    navigation.navigate("CreateLobbyPage");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setPinThunk());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View>
      {allPlayers.map((el) => (
        <View key={el.id}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/favicon.png")}
          />
          <Text>{el.name}</Text>
        </View>
      ))}
      <Text>Ваш PIN: {pin}</Text>
      <Button
        onPress={() => navigation.navigate("FactPage")}
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
