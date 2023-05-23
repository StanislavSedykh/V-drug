import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonStandartProps = {
  title: string;
  onPress: () => void;
  style?: string
}
export default function ButtonStandart({title, onPress, style}: ButtonStandartProps): JSX.Element {
  return (
    <Pressable style={style ? style :styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2 ,
    borderColor: '#808080',
    backgroundColor: '#00bfff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});