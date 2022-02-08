import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';
import colors from '../../constants/colors';
import Actions from '../../components/home/Actions';
import TokenCollectiblesSwap from '../../components/home/TokenCollectiblesSwap';
import TokenCard from '../../components/home/TokenCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';

export default function Home() {
  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };
  return (
    <PortalProvider>
      <ReusableBottomSheet
        title="Account"
        modalRef={modalRef}
        children={
          <View>
            <AppText> My love</AppText>
          </View>
        }
      />
      <Screen>
        <View style={styles.row}>
          <View style={styles.username}>
            <TouchableOpacity style={styles.rowArea} onPress={onOpen}>
              <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
              <AppText bold yellow>
                Queen Bee
              </AppText>
              <Icon name="chevron-down" />
            </TouchableOpacity>
          </View>
          <Image source={require('../../../assets/dogeroundedLogo.png')} style={styles.logo} />
        </View>
        <AppText big>4.8729 ETH</AppText>

        <View style={styles.usd}>
          <AppText grey>$ 8,391.14</AppText>
          <View style={[styles.rowArea, { marginHorizontal: 25 }]}>
            <Icon name="arrow-top-right" color={colors.green} size={20} />
            <AppText grey green>
              {'9.97'}%
            </AppText>
          </View>
        </View>

        <Actions />
        <TokenCollectiblesSwap />
        <TokenCard />
        <TokenCard />
        <TokenCard />
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  username: {
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  logo: {
    width: 140,
    height: 140
  },
  rowArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  usd: {
    flexDirection: 'row'
    // justifyContent: 'space-around'
  }
});
