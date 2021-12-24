import styled from "styled-components/native";

const Button = styled.Button`
    border-radius: ${props => props.borderRadius || "20px"},
    border: 2px solid ${props => props.color || "#DBA134"},
    background: ${props => props.backgroundColor || "transparent"},
    color: ${props => props.color || "#FFFFFF"},
    margin-vertical: ${props => props.marginVertical || "12px"};
`;

export default Button;
