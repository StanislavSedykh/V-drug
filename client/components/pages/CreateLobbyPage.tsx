import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function CreateLobbyPage({ navigation }): JSX.Element {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate("Lobby")}
        title="Создать игру"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={() => navigation.navigate("Lobby")}
        title="Присоединиться к игре"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      
      <TextInput style={styles.input} />
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
