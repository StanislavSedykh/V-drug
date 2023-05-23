import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import { setPinPartThank } from '../../features/redux/slices/game/countThunk';
import TextInputStandart from '../UI/TextInputStandart';
import ButtonStandart from '../UI/ButtonStandart';

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
    <View style={styles.container}>
      <TextInputStandart
        value={pinPart}
        onChangeText={setPinPart}
        placeholder="введите PIN"
        keyboardType="numeric"
      />
      <ButtonStandart
        onPress={pinPartHandler}
        title="Поехали!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
