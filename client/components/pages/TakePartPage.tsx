import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import { setPinPartThank } from '../../features/redux/slices/game/countThunk';

export default function TakePartPage(): JSX.Element {
  const [pinPart, setPinPart] = useState('');
  const dispatch = useAppDispatch();
  const pinPartHandler = () => {
    try {
      dispatch(setPinPartThank( {pinPart} ));
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
