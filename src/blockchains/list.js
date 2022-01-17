import React from 'react';
import styled from 'styled-components/native';
import { GlobalListItem as SharedListItem } from './global';

const FlatList = styled.FlatList``;

const BlockchainList = () => (
  <FlatList
    data={[{ id: 'binance' }, { id: 'ethereum' }]}
    renderItem={({ item }) => <SharedListItem network={item.id} key={item.id} />}
  />
);

export default BlockchainList;
