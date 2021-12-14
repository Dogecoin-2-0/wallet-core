import styled from "styled-components/native";

const Title = styled.Text`
    font-size: ${props => props.fontSize || "18px"}
    color: ${props => props.color || "black"}}
    font-weight: ${props => props.fontWeight || 400}
`;

export default Title;