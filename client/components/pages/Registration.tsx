import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import { signUpThunk } from "../../features/redux/slices/user/thunkAction";
import { SignUpType } from "../../types/user/formTypes";
import { setError } from "../../features/redux/slices/error/errorSlice";

export default function Registration({ navigation }): JSX.Element {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<string>("");

  const inputChangeHandler = () => {
    // setText();
  };
  const user = useAppSelector((state) => state.user);
  const status = useAppSelector((state) => state.fetching.status);

  const dispatch = useAppDispatch();

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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const registerHandler = async () => {
    try {
      dispatch(signUpThunk({ email, password, name, image }));
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
