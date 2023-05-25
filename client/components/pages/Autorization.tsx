import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginThunk } from '../../features/redux/slices/user/thunkAction';
import { LoginType } from '../../types/user/formTypes';
import { useAppDispatch } from '../../features/redux/hooks';
import TextInputStandart from '../UI/TextInputStandart';
import ButtonStandart from '../UI/ButtonStandart';


export default function Autorization({ navigation }): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        secureTextEntry={!showPassword}
      />
          <TouchableOpacity onPress={toggleShowPassword}>
       <Text style={styles.text}>{showPassword ? '🙅🏿‍♂️' : '👁️'}</Text>
       </TouchableOpacity>
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
  text:{
    position: 'absolute',
    top: -45,
    right: -150,
    fontSize: 20,
  }
});
