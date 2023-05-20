import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function MakePhoto(): JSX.Element {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.1,
        });
        setPhoto(data.base64);
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
        {photo && (
          <Image
            source={{ uri: `data:image/png;base64,${photo}` }}
            style={styles.photo}
          />
        )}
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
