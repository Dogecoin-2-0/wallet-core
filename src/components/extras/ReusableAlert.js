/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Icon } from '..';
import colors from '../../constants/colors';
import AppText from '../AppText';
import AppButton from '../AppButton';

const ReusableAlert = ({ visible, isSuccessful, message, close }) => {
  return (
    <FancyAlert
      visible={visible}
      icon={
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: 50,
            backgroundColor: isSuccessful ? colors.green : colors.red
          }}
        >
          <Icon name={isSuccessful ? 'check' : 'cancel'} color={colors.white} />
        </View>
      }
      style={{ backgroundColor: colors.white, display: 'flex', flexDirection: 'column' }}
      onRequestClose={close}
    >
      <AppText style={{ marginTop: -16, marginBottom: 32 }}>{message}</AppText>
      <AppButton title="Close" onPress={close} />
    </FancyAlert>
  );
};

ReusableAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func
};

export default ReusableAlert;
