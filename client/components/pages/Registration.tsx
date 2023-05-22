import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch } from '../../features/redux/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkAction';
import { SignUpType } from '../../types/user/formTypes';

export default function Registration({ navigation, route }): JSX.Element {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [photo, setPhoto] = useState(route.params?.photo);
  const inputChangeHandler = () => {
    // setText();
  };
  console.log(photo);
  useEffect(() => {
    setPhoto(route.params?.photo);
  }, [route.params?.photo]);
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setPhoto({
        uri: uri,
        base64: `data:image/jpg;base64,${result.base64}`,
      });
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
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {photo && (
        <Image
          source={{ uri: `data:image/png;base64,${photo}` }}
          style={styles.photo}
        />
      )}
      <Button title="Камера" onPress={() => navigation.navigate('MakePhoto')} />
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
  photo: {
    width: 200,
    height: 200,
  },
  image: {
    width: 200,
    height: 200,
  },
});
