import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { TouchableOpacity } from '../components';
import { fetchBlockchainInfo } from '../utils';

const styles = StyleSheet.create({
  separator: {
    flex: 1
  },
  image: {
    width: '30px',
    height: '30px'
  }
});

const Flex = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopInnerFlex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

const Text = styled.Text``;

const GlobalListItem = props => {
  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    fetchBlockchainInfo(props.network).then(setInfo);
  }, []);

  return (
    <TouchableOpacity>
      <Flex>
        <TopInnerFlex>
          <Image source={info.image} style={styles.image} />
          <Text>{info.name}</Text>
          <View style={styles.separator} />
          <Text>5</Text>
        </TopInnerFlex>
        <View>
          <Text>0</Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

GlobalListItem.propTypes = {
  network: propTypes.string.isRequired
};

export { GlobalListItem };
