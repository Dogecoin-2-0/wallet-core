import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { utils } from 'ethers';
import Phrase from './phrase';

const Body = styled.View`
  background-color: ${props => props.backgroundColor};
`;

const Text = styled.Text`
  font-family: ${props => props.fontFamily || 'Verdana, sans-serif'};
  margin-top: ${props => props.marginTop || '45px'};
  margin-left: ${props => props.marginLeft || '45px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: ${props => props.fontSize || '12px'};
  line-height: ${props => props.lineHeight || '20px'};
  color: ${props => props.color || '#000'};
`;

const MainScreen = props => {
  const [phrase, setPhrase] = React.useState('');

  React.useEffect(() => {
    const randBytes = utils.randomBytes(16);
    const mnemonic = utils.entropyToMnemonic(randBytes);
    setPhrase(mnemonic);
  }, []);
  return (
    <Body backgroundColor="#fafafa">
      <Text
        color="#0a0a0a"
        fontFamily="Red Hat Display"
        marginTop="104px"
        fontWeight="bold"
        fontSize="18px"
        marginLeft="24px"
        lineHeight="28px"
      >
        {props.title}
      </Text>
      <Text
        color="#858585"
        fontFamily="Red Hat Display"
        marginTop="148px"
        marginLeft="24px"
        fontSize="16px"
        lineHeight="24px"
      >
        {props.description}
      </Text>
      <Phrase phrase={phrase} />
    </Body>
  );
};

MainScreen.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};

export default MainScreen;
