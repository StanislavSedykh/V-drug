import React from "react";
import { Button, Text, View } from "react-native";

export default function Lobby({ navigation }): JSX.Element {
  return (
    <View>
      <Text>Vasya Pupkin</Text>
      <Text>Tapac</Text>
      <Text>Lyubitel Sobak</Text>
      <Text>Beb</Text>
      <Text>Bob</Text>
      <Button
        onPress={() => navigation.navigate("FactPage")}
        title="Начать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate("CreateLobbyPage")}
        title="Отменить"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
