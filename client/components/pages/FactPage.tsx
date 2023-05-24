import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import TextInputStandart from "../UI/TextInputStandart";
import ButtonStandart from "../UI/ButtonStandart";

import { setFactThunk } from "../../features/redux/slices/fact/factThunk";
import { addFact } from "../../features/redux/slices/fact/factAction";

export default function FactPage({ navigation }): JSX.Element {
  const [fact, setFact] = useState("");
  const [factReady, setFactReady] = useState(true);
  const dispatch = useAppDispatch();
  const facts = useAppSelector((state) => state.fact.facts);
  const users = useAppSelector((state) => state.game.allPlayers);

  const setFactHandler = () => {
    try {
      dispatch(setFactThunk(fact));
      dispatch(addFact(fact));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (users.length === facts.length) {
      navigation.navigate("GamePage");
    }
  }, [facts]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      {!factReady ? (
        <Text>Ожидание игроков</Text>
      ) : (
        <>
          <TextInputStandart
            value={fact}
            onChangeText={setFact}
            placeholder="Факт"
          />
          <ButtonStandart
            onPress={() => {
              setFactHandler();
              setFactReady(false);
            }}
            title="Готов!"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
