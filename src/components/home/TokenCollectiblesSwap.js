import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

export default function TokenCollectiblesSwap() {
  const categories = ['Tokens', 'Collectibles'];
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setCategoryIndex(index)}>
          <View style={[catergoryIndex === index && styles.categoryTextSelected]}>
            <AppText bold style={[styles.categoryText, catergoryIndex === index && styles.categoryTextSelected]}>
              {item}
            </AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  categoryTextSelected: {
    color: colors.yellow,
    paddingBottom: 4,
    paddingHorizontal: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.yellow
  }
});
