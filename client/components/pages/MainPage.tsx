import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import { socketInit } from "../../features/websocket/wsActions";

export default function MainPage({ navigation }): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  useEffect(() => {
    if (user.status === "logged") {
      navigation.navigate("CreateLobbyPage");
    }
  }, [user.status]);
  return (
    <View>
      <Button
        onPress={() => navigation.navigate("Registration")}
        title="Зарегистрироваться"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate("Autorization")}
        title="Войти"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate("GamePage")}
        title="Дежурная страница игры"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate("ResultPage")}
        title="ResultPage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate("ProfilePage")}
        title="ProfilePage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
