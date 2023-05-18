import React from 'react'
import { FlatList, Text, View } from 'react-native'

export default function GeneralPage() {
  return (
    <View >
    <FlatList
      data={[
        {
        id:'1',
        name:'Alex'
        }
      ]}
      renderItem={({item}) => <Text >{item.id} --- {item.name}</Text>}
    />
  </View>
  )
}
