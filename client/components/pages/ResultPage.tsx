import React from 'react'
import { Button, View,   StyleSheet } from 'react-native'
import GeneralPage from './GeneralPage';
import Navigation from '../Navigation';

export default function ResultPage({navigation}):JSX.Element {
  return (
<View style={styles.fixToText}>
  <Button title='Общая статистика'  onPress={() => navigation.navigate('GeneralPage')}/>
  <Button title='Личная статистика' onPress={() => navigation.navigate('ScorePage')}/>
</View>
  )
}

const styles = StyleSheet.create({

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});