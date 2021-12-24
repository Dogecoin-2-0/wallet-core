import React from "react";
import styled from "styled-components/native";
import _ from "lodash";
import propTypes from "prop-types";

const View = styled.View``;
const Text = styled.Text``;

const Phrase = props => {
  return (
    <View>
      {_.map(props.phrase.split(" "), (item, key) => (
        <Text key={key}>{item}</Text>
      ))}
    </View>
  );
};

Phrase.propTypes = {
  phrase: propTypes.string.isRequired
};

export default Phrase;
