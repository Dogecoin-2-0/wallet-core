import React from "react";
import propTypes from "prop-types";
import styled from "styled-components/native";

const Switch = styled.Switch`
  background-color: ${props => props.backgroundColor || "#cccccc"};
`;

const ToggleSwitch = ({ value, onValueChange, trackColor, iosBackgroundColor, thumbColor }) => (
  <Switch
    trackColor={trackColor}
    thumbColor={thumbColor}
    ios_backgroundColor={iosBackgroundColor}
    onValueChange={onValueChange}
    value={value}
  />
);

ToggleSwitch.defaultPropTypes = {
  value: false,
  onValueChange: val => console.log(val),
  trackColor: { true: "#dba134", false: "#cccccc" },
  iosBackgroundColor: "#cccccc",
  thumbColor: "#ffffff"
};

ToggleSwitch.propTypes = {
  value: propTypes.bool,
  onValueChange: propTypes.func,
  trackColor: propTypes.object,
  iosBackgroundColor: propTypes.string,
  thumbColor: propTypes.string
};

export default ToggleSwitch;
