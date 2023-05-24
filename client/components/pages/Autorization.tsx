import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginThunk } from '../../features/redux/slices/user/thunkAction';
import { LoginType } from '../../types/user/formTypes';
import { useAppDispatch } from '../../features/redux/hooks';
import TextInputStandart from '../UI/TextInputStandart';
import ButtonStandart from '../UI/ButtonStandart';


export default function Autorization({ navigation }): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const autorizationHandler = async () => {
    try {
      dispatch(loginThunk({ password, email } as LoginType));
      navigation.navigate('CreateLobbyPage');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInputStandart
        value={email}
        onChangeText={setEmail}
        placeholder="email"
      />
      <TextInputStandart
        value={password}
        onChangeText={setPassword}
        placeholder="пароль/password"
      />
      <ButtonStandart
        onPress={autorizationHandler}
        title="Войти"
      />
      <ButtonStandart
        title="Главная страница"
        onPress={() => navigation.navigate('MainPage')}
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
  },
});
