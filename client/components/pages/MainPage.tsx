import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ButtonStandart from '../ButtonStandart';

export default function MainPage({ navigation }): JSX.Element {

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Вдруг</Text>
      <ButtonStandart  title="Зарегистрироваться" onPress={() => navigation.navigate('Registration')}/>
 <ButtonStandart  title="Войти" onPress={() => navigation.navigate('Autorization')}/>  
<ButtonStandart        title="Дежурная страница игры" onPress={() => navigation.navigate('GamePage')}/>
      <ButtonStandart         title="ResultPage"      onPress={() => navigation.navigate('ResultPage')}/>
         <ButtonStandart         title="ProfilePage"         onPress={() => navigation.navigate('ProfilePage')}/>
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