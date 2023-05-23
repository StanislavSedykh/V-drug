import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import { signUpThunk } from "../../features/redux/slices/user/thunkAction";
import { SignUpType } from "../../types/user/formTypes";
import { setError } from "../../features/redux/slices/error/errorSlice";
import { ImageUpload, SignUpType } from '../../types/user/formTypes';
import { API_URL } from '@env'

export default function Registration({ navigation }): JSX.Element {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<string>('');

  async function uploadImageAsync(uri: any) {
    const apiUrl = `http://${
            Platform.OS === 'android' || Platform.OS === 'ios'
              ? API_URL
              : 'localhost'
          }:3001/api/auth/signup`
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData= new FormData();
    formData.append('image', {
      uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    dispatch(signUpThunk(apiUrl, options));
  }
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const status = useAppSelector((state) => state.fetching.status);

  useEffect(() => {
    if (user.id) {
      dispatch(setError({ error: "Вы уже зарезервованы" }));
    }
  }, [user]);
  useEffect(() => {
    if (status === "logged") {
      navigation.navigate("CreateLobbyPage");
    }
  }, [status]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    });
    
    console.log(result);
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      try {
        await uploadImageAsync(result.assets[0].uri);
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const registerHandler = async () => {
    try {
      navigation.navigate('CreateLobbyPage');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        maxLength={320}
      />
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="имя/name"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="пароль/password"
      />
      <Button
        onPress={registerHandler}
        title="Зарегистрироваться"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button title="Загрузить фото" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        title="Сделать фото"
        onPress={() => navigation.navigate("MakePhoto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
