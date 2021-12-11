import styled from "styled-components/native";

const TouchableOpacity = styled.TouchableOpacity`
  margin-vertical: ${props => props.marginVertical};
  background-color: ${props => props.backgroundColor};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default TouchableOpacity;
