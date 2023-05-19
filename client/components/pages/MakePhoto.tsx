import { Camera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MakePhoto(): JSX.Element {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Camera style={styles.camera} type={type}>
      <View>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text>Сменить камеру</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
const styles = StyleSheet.create({
 camera:{
    flex:1,
 }
  });
