import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function TextStandart():JSX.Element {
  return (
    <Text style={styles.itemText}>{item}</Text>
  )
}
const styles = StyleSheet.create({
itemText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},})