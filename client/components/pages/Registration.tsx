import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch } from '../../features/redux/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkAction';
import { ImageUpload, SignUpType } from '../../types/user/formTypes';
import { API_URL } from '@env';
import { Camera, CameraType } from 'expo-camera';

export default function Registration({ navigation }): JSX.Element {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<string>('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [useCamera, setUseCamera] = useState(false);

  async function uploadImageAsync(uri: any) {
    const apiUrl = `http://${
      Platform.OS === 'android' || Platform.OS === 'ios' ? API_URL : 'localhost'
    }:3001/api/auth/signup`;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const dispatch = useAppDispatch();

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
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
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

  const takePhoto = async () => {
    try {
      await requestPermission();
      if (permission && permission.status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
          try {
            await uploadImageAsync(result.assets[0].uri);
          } catch (err) {
            console.log(err);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const takeCamera = async () => {
    setUseCamera(!useCamera);
  };
  return (
    <View style={styles.container}>
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
        onPress={'CreateLobbyPage'}
        title="Зарегистрироваться"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        style={styles.button}
      />
      <Button onPress={pickImage} title="Загрузить фото из галереи" />
      <Button onPress={takePhoto} title="Использовать камеру" />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 100,
    overflow: 'hidden',

    borderWidth: 3,
    borderColor: 'red',
  },

  photo: {
    width: 200,
    height: 200,
  },
  camera: {
    flex: 0.5,
  },
});
