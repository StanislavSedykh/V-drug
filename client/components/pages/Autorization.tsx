import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginThunk } from '../../features/redux/slices/user/thunkAction';
import { LoginType } from '../../types/user/formTypes';
import { useAppDispatch } from '../../features/redux/hooks';

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
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="пароль/password"
      />
      <Button
        onPress={autorizationHandler}
        title="Войти"
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
