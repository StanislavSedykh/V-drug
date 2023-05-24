import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function ScorePage():JSX.Element {

  return (
    <View style={styles.container}>
    <FlatList
      data={[
        {
        correct:'✅',
        name:'Alex',
        fact: 'Alex is a good boy'
        }
      ]}
      style={styles.itemContainer}
      style={styles.correct}
      renderItem={({item}) => <Text style={styles.text}>{item.correct}  name: {item.name} fact: {item.fact}</Text>}
    />
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  correct: {
    fontSize: 24,   marginRight: 8  },
  text: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fact: {
    fontSize: 16,
  },
});
