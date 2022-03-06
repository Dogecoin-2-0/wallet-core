import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { Icon, TouchableOpacity } from '../../components';
import colors from '../../constants/colors';

export default function ScanBarcode({ handleBarCodeScan, scanned, setScanned, onCancel }) {
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <AppText>Requesting for camera permission</AppText>;
  }
  if (hasPermission === false) {
    return <AppText>No access to camera</AppText>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={props => {
          if (!scanned) return handleBarCodeScan(props);
          return undefined;
        }}
        barCodeScannerSettings={{
          barcodeTypes: ['qr']
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
        <Icon name="close" color={colors.white} size={35} />
      </TouchableOpacity>

      {!scanned && (
        <>
          <Image source={require('../../../assets/scan-code.png')} />
          <AppText white centered>
            Scanning...
          </AppText>
        </>
      )}
      {scanned && <AppButton outlined title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 40,
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 280
  }
});
