import styled from "styled-components/native";

const TouchableOpacity = styled.TouchableOpacity`
  margin-vertical: ${props => props.marginVertical || "12px"};
  background-color: ${props => props.backgroundColor || "#fff"};
  width: ${props => props.width || "327px"};
  height: ${props => props.height || "78px"};
`;

export default TouchableOpacity;
