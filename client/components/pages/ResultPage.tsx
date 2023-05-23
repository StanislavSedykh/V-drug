import React from 'react'
import { Button, View,   StyleSheet } from 'react-native'


export default function ResultPage({navigation}):JSX.Element {
  return (
<View style={styles.fixToText}>
  <Button title='Общая статистика'     color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button} onPress={() => navigation.navigate('GeneralPage')}/>
  <Button title='Личная статистика'     color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button} onPress={() => navigation.navigate('ScorePage')}/>
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
  button:{
    marginVertical: 10,
  }
});