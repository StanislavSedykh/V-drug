import React from 'react'
import { Button, View,   StyleSheet, Text } from 'react-native'
import ButtonStandart from '../UI/ButtonStandart';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';


export default function ResultPage({navigation}):JSX.Element {
  
  return (
<View style={styles.fixToText}>
  <ButtonStandart title='Общая статистика' onPress={() => navigation.navigate('GeneralPage')}/>
  <ButtonStandart title='Личная статистика' onPress={() => navigation.navigate('ScorePage')}/>
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
    color: '#9400d3',
    backgoundColor: '#9400d3'
  },
});