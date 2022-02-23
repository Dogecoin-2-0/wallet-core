import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { Icon, TouchableOpacity } from '../../components';
import colors from '../../constants/colors';

export default function ScanBarcode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <AppText>Requesting for camera permission</AppText>;
  }
  if (hasPermission === false) {
    return <AppText>No access to camera</AppText>;
  }

  const goBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity onPress={goBack} style={styles.closeButton}>
        <Icon name="close" color={colors.white} size={35} />
      </TouchableOpacity>

      <AppText white centered>
        Scanning...
      </AppText>
      {scanned && <AppButton title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
    top: 100,
    left: 300
  }
});
