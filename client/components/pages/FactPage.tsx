import React, { useEffect, useState } from 'react';
import { BackHandler, Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import TextInputStandart from '../UI/TextInputStandart';
import ButtonStandart from '../UI/ButtonStandart';


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
      <TextInputStandart value={fact} onChangeText={setFact} placeholder='Факт'/>
      <ButtonStandart
        onPress={() => navigation.navigate('GamePage')}
        title="Готов!"
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
