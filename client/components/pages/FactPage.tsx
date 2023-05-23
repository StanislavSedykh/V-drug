import React, { useEffect, useState } from 'react';
import { BackHandler, Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import { setFactThunk } from '../../features/redux/slices/fact/factThunk';

export default function FactPage({ navigation }): JSX.Element {
  const [fact, setFact] = useState('');
  const dispatch = useAppDispatch();

  const setFactHandler = () => {
    try {
      dispatch(setFactThunk(fact));
      navigation.navigate('GamePage');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={fact}
        onChangeText={setFact}
        style={styles.input}
        placeholder="                               Факт"
      />
      <Button
        onPress={setFactHandler}
        title="Готов!"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
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
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
