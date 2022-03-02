import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Portal } from '@gorhom/portal';
import { Modalize } from 'react-native-modalize';
import AppText from '../AppText';
import colors from '../../constants/colors';

const { height } = Dimensions.get('screen');
const modalHeight = height * 0.6;

export default function ReusableBottomSheet({ modalRef, title, children, ratio }) {
  const responsiveHeight = height * ratio;
  console.log(responsiveHeight);
  return (
    <Portal>
      <Modalize ref={modalRef} modalHeight={ratio ? responsiveHeight : height ? height : modalHeight}>
        <View style={styles.content}>
          <View>
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
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: colors.white
  }
});
