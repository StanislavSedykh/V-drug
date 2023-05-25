import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useAppSelector } from '../../features/redux/hooks';

export default function GeneralPage() {

  return (
    <View style={styles.container}>
    
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'sans-serif',

  },
});