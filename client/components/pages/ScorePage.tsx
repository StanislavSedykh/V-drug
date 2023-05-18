import React from 'react'
import { FlatList, Text, View } from 'react-native'

export default function ScorePage() {

  return (
    <View >
    <FlatList
      data={[
        {
        correct:'✅',
        name:'Alex',
        fact: 'Alex is a good boy'
        }
      ]}
      renderItem={({item}) => <Text>{item.correct}  name: {item.name} fact: {item.fact}</Text>}
    />
  </View>
  )
}
