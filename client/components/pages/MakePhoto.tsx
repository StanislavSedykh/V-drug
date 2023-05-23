import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function MakePhoto({ navigation }): JSX.Element {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.1,
        });
        setPhoto(data.base64);
        navigation.navigate('Registration', { photo: data.base64 });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <Camera style={styles.camera} type={type} ref={cameraRef}>
      <View>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text>Сменить камеру</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Text>Сделать фото</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  photo: {
    width: 100,
    height: 100,
  },
});
