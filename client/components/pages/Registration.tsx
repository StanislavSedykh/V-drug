import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch } from '../../features/redux/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkAction';
import { ImageUpload, SignUpType } from '../../types/user/formTypes';
import { API_URL } from '@env';
import ButtonStandart from '../UI/ButtonStandart';
import TextInputStandart from '../UI/TextInputStandart';
import ImageStandart from '../UI/ImageStandart';
import { Camera } from 'expo-camera';
import CameraButton from '../UI/CameraButton';

export default function Registration({ navigation, route }): JSX.Element {
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(route.params?.photo);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<string>('');

  async function uploadImageAsync(uri: any) {
    const apiUrl = `http://${
      Platform.OS === 'android' || Platform.OS === 'ios' ? API_URL : 'localhost'
    }:3001/api/auth/signup`;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
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
  useEffect(() => {
    setPhoto(route.params?.photo);
  }, [route.params?.photo]);
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setPhoto({
        uri: uri,
        base64: `data:image/jpg;base64,${result.base64}`,
      });
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
      let selectedImage;
      if (image) {
        selectedImage = { uri: image };
      } else {
        selectedImage = {
          uri: photo.uri,
          base64: `data:image/png;base64,${photo.base64}`,
        };
      }
      dispatch(
        signUpThunk({
          email,
          password,
          name,
          image: selectedImage,
        })
      );
      navigation.navigate('CreateLobbyPage');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInputStandart  
      onChangeText={setEmail}
      placeholder="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        maxLength={320}
        />
         <TextInputStandart  
                 value={name}
                onChangeText={setName}
         placeholder="имя/name"
        keyboardType='deafult'
        textContentType="none"
        autoCapitalize="sentences"
        autoCorrect={true}
        spellCheck={true}
        maxLength={100}
        />
      <TextInputStandart  
              value={password}
                 onChangeText={setPassword}
                placeholder="пароль/password"
        keyboardType='deafult'
        textContentType="none"
        autoCapitalize="sentences"
        autoCorrect={false}
        spellCheck={false}
        maxLength={100}
        />
      <ButtonStandart  title="Зарегистрироваться" onPress={registerHandler}/>
      <CameraButton title="🖼" onPress={pickImage}/>

      {image && <ImageStandart source={{ uri: image }}  />}
      {photo && (
        <ImageStandart
          source={{ uri: `data:image/png;base64,${photo}` }}
        />
      )}
      <CameraButton title="📷" onPress={() => navigation.navigate('MakePhoto')} />
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
})

