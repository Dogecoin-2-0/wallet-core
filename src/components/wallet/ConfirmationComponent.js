/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Icon } from '..';
import colors from '../../constants/colors';
import AppText from '../AppText';
import AccountCard from './AccountCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginVertical: 0
  }
});

export default function ConfirmationComponent({
  recipient = '0x',
  amount = '0',
  symbol = 'BNB',
  fee = '1.00',
  price = '1.00',
  onXPress,
  onFeeEditPress
}) {
  return (
    <View style={[styles.container]}>
      <View style={{ marginBottom: 16 }}>
        <AccountCard />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: colors.white,
          paddingHorizontal: 24,
          paddingVertical: 16
        }}
      >
        <AppText bold medium>
          To
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: colors.ghostWhite,
            height: 56,
            borderRadius: 16,
            borderWidth: 1,
            paddingHorizontal: 16,
            paddingVertical: 16
          }}
        >
          <AppText bold small style={{ color: colors.weirdBlack }}>
            {recipient.slice(0, 6) + '...' + recipient.slice(recipient.length - 4, recipient.length)}
          </AppText>
          <Pressable onPress={onXPress}>
            <Icon size={16} name="close" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 24,
          paddingHorizontal: 0,
          backgroundColor: colors.white,
          borderRadius: 16
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 0,
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginBottom: 24
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              display: 'flex',
              width: '100%'
            }}
          >
            <>
              <AppText medium>Amount </AppText>
            </>
            <>
              <AppText medium>
                {amount} {symbol}
              </AppText>
            </>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              display: 'flex',
              width: '100%'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexBasis: '33.3333%',
                flexGrow: 1
              }}
            >
              <AppText small style={{ color: colors.grey }}>
                Network fee
              </AppText>
              <Pressable
                style={{
                  backgroundColor: colors.weirdYellow,
                  paddingHorizontal: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24
                }}
                onPress={onFeeEditPress}
              >
                <AppText small yellow bold>
                  Edit
                </AppText>
              </Pressable>
            </View>
            <View style={{ flexBasis: '38%', flexGrow: 1 }} />
            <AppText small style={{ color: colors.grey }}>
              {fee} {symbol}
            </AppText>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 0,
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginBottom: 24
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              display: 'flex',
              width: '100%'
            }}
          >
            <>
              <AppText medium>Total Amount</AppText>
            </>
            <>
              <AppText medium bold>
                {(parseFloat(amount) + parseFloat(fee)).toPrecision(4)} {symbol}
              </AppText>
            </>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              display: 'flex',
              width: '100%'
            }}
          >
            <View style={{ flexBasis: '33.3333%', flexGrow: 1 }} />
            <View style={{ flexBasis: '38%', flexGrow: 1 }} />
            <AppText grey small>
              ${''}
              {((parseFloat(amount) + parseFloat(fee)) * parseFloat(price)).toPrecision(4)}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
