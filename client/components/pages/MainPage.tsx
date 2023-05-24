import React, { useEffect } from "react";
import { useAppSelector } from "../../features/redux/hooks";
import { Button, StyleSheet, Text, View } from 'react-native';

export default function MainPage({ navigation }): JSX.Element {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.status === "logged") {
      navigation.navigate("CreateLobbyPage");
    }
  }, [user.status]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Вдруг</Text>

      <Button
        onPress={() => navigation.navigate("Registration")}
        title="Зарегистрироваться"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />
      <Button
        onPress={() => navigation.navigate("Autorization")}
        title="Войти"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />

      <Button
        onPress={() => navigation.navigate('GamePage')}
        title="Дежурная страница игры"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />

        <Button
        onPress={() => navigation.navigate('ResultPage')}
        title="ResultPage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />
      <Button
        onPress={() => navigation.navigate("ProfilePage")}
        title="ProfilePage"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});