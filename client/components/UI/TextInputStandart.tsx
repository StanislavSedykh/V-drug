import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

type InputProps = {
  placeholder: string,
  keyboardType?: string,
  textContentType?: string,
  autoCapitalize?: string,
  autoCorrect?: boolean,
  spellCheck?: boolean,
  maxLength?: number,
  value?: string,
  onChangeText?: any
}
