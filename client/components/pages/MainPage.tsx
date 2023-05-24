import React, { useEffect } from "react";
import { useAppSelector } from "../../features/redux/hooks";
import { Button, StyleSheet, Text, View } from 'react-native';
import ButtonStandart from '../UI/ButtonStandart';

export default function MainPage({ navigation }): JSX.Element {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.status === "logged") {
      navigation.navigate("CreateLobbyPage");
    }
  }, [user.status]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> В-друг</Text>
      <ButtonStandart
        title="Зарегистрироваться"
        onPress={() => navigation.navigate('Registration')}
      />
      <ButtonStandart
        onPress={() => navigation.navigate("Autorization")}
        title="Войти"
      />
      <ButtonStandart
        title="ResultPage"
        onPress={() => navigation.navigate("ResultPage")}
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
    borderRadius: 30,
  },
});
