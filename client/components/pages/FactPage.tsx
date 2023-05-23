import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../features/redux/hooks';
import TextInputStandart from '../UI/TextInputStandart';
import ButtonStandart from '../UI/ButtonStandart';



export default function FactPage({ navigation }): JSX.Element {
  const [fact, setFact] = useState('');
  const dispatch = useAppDispatch()

  const setFactHandler = () => {
    dispatch()
  }
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
