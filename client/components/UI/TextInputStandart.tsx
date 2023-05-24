import React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput, TextInputProps } from 'react-native'

type InputProps = {
  placeholder: string,
  keyboardType?: KeyboardTypeOptions,
  textContentType?: TextInputProps['textContentType'],
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean,
  spellCheck?: boolean,
  maxLength?: number,
  value?: string,
  onChangeText?: any
}

export default function TextInputStandart({placeholder, keyboardType, textContentType, autoCapitalize, autoCorrect, spellCheck, maxLength, value, onChangeText}: InputProps):JSX.Element {
  return (
   <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType}
   textContentType={textContentType}
   autoCapitalize={autoCapitalize}
   autoCorrect={autoCorrect}
   spellCheck={spellCheck}
   maxLength={maxLength}
   value={value}
   onChangeText={onChangeText}
   />
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 330,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    textAlign: 'center'
  },
});