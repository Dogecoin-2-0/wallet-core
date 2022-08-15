/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Portal } from '@gorhom/portal';
import { Modalize } from 'react-native-modalize';
import AppText from '../AppText';

export default function ReusableBottomSheet({ modalRef, title, children, ratio, extraStyle }) {
  const { height } = Dimensions.get('screen');
  const modalHeight = height * 0.6;
  const responsiveHeight = height * ratio;
  return (
    <Portal>
      <Modalize ref={modalRef} modalHeight={ratio ? responsiveHeight : height ? height : modalHeight}>
        <View style={[styles.content, extraStyle && { ...extraStyle }]}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AppText bold medium padded>
              {title}
            </AppText>
          </View>

          {children}
          {/* <AppButton title="Got it" onPress={onClose} /> */}
        </View>
      </Modalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    // height: modalHeight,
    paddingHorizontal: 0,
    paddingVertical: 32
  }
});
