import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import { setPinPartThank } from "../../features/redux/slices/game/countThunk";
import { joinGameAction } from "../../features/redux/slices/game/gameAction";

export default function TakePartPage({navigation}): JSX.Element {
  const [pinPart, setPinPart] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const pinPartHandler = () => {
    try {
      dispatch(setPinPartThank({ pinPart }));
      dispatch(joinGameAction(user));
      navigation.navigate("Lobby");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        value={pinPart}
        onChangeText={setPinPart}
        style={styles.input}
        placeholder="введите PIN"
        keyboardType="numeric"
      />
      <Button
        onPress={pinPartHandler}
        title="Поехали!"
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
