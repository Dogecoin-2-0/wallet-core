/* eslint-disable react-native/no-color-literals */
import "./global";
import "react-native-get-random-values";
import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { SeedScreen } from "./src/screens";
import BlockchainList from "./src/blockchains/list";

const View = styled.View`
  background-color: ${props => props.backgroundColor || "#fafafa"};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <SeedScreen
        title="Write Down Your Seed Phrase"
        description="This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase (in order) on the next step."
      />
      <BlockchainList />
    </View>
  );
}
