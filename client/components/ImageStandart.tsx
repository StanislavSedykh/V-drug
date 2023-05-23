import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function ImageStandart({source}):JSX.Element {
  return (
    <Image style={styles.image} source={source}/>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red"
  }})
