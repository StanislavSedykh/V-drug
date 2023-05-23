import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function GeneralPage() {
  return (
    <View style={styles.container}>
    <FlatList style={styles.itemContainer}
      data={[
        {
        id:'1',
        name:'Alex'
        }
      ]}
      renderItem={({item}) => <Text style={styles.itemText}>{item.id} --- {item.name}</Text>}
    />
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f6f6f6',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});