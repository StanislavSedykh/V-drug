import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'

export default function ProfilePage():JSX.Element {
  const num = 10
  return (
<View>
  <Image source={require('../../assets/favicon.png')}/>
  <FlatList
      data={[
        {
        name:'Alex',
        }
      ]}
      renderItem={({item}) => <Text>  name: {item.name}</Text>}
    />
    <Text>  {num}</Text>
</View>
  )
}
