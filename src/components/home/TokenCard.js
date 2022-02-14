/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppText from '../AppText';
import colors from '../../constants/colors';
import Icon from '../Icon';
import { fetchBlockchainInfo } from '../../utils';

function TokenCard({ id, onPress }) {
  const [info, setInfo] = useState({});

  useEffect(async () => {
    const i = await fetchBlockchainInfo(id);
    setInfo(i);
  }, []);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(info)}>
      <View style={styles.avatar}>
        <Image source={{ uri: info.image }} style={{ height: '100%', width: '100%' }} />
      </View>
      <View>
        <View style={styles.row}>
          <AppText medium> {info.name} </AppText>
          <AppText medium> 2.5123 {info.symbol} </AppText>
        </View>
        <View style={styles.row}>
          <AppText grey> $1,722 </AppText>
          <View style={styles.row}>
            <Icon name="arrow-top-right" color={colors.green} size={20} />
            <AppText green> 4.06% </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginVertical: 5,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 2,
    paddingRight: 2
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: colors.lightSmoke, // 'rgba(255, 255, 255, 0.1)',
    marginRight: 20
  }
});

TokenCard.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default TokenCard;
