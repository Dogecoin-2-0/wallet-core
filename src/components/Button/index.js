import styled from "styled-components";

const Button = styled.button`
    border-radius: ${props => props.borderRadius},
    border: 2px solid ${props => props.color},
    background: ${props => props.backgroundColor},
    color: ${props => props.color},
    margin-vertical: ${props => props.marginVertical};
`;

export default Button;