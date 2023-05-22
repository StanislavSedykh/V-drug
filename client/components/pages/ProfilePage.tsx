import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { scoreThunk } from '../../features/redux/slices/user/thunkAction';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const { score } = useAppSelector((state) => state.score);
  const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(scoreThunk())
}, [])

  return (
    <View>
      <Image source={require('../../assets/favicon.png')} />
      <FlatList
        data={[
          {
            name: user.status === 'logged' ? user.name : 'Guest',
          },
        ]}
        renderItem={({ item }) => <Text> name: {item.name}</Text>}
      />
      <Text>{score}</Text>
    </View>
  );
}
