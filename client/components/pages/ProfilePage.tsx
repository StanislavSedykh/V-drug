import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/favicon.png')} />
      <FlatList
        data={[
          {
            name: user.status === 'logged' ? user.name : 'Guest',
          },
        ]}
        renderItem={({ item }) => <Text style={styles.name}> name: {item.name}</Text>}
      />
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});