import styled from "styled-components";

const Button = styled.button`
    border-radius: ${props => props.borderRadius},
    border: 2px solid ${props => props.theme.main},
    background: ${props => props.theme.main},
    color: ${props => props.theme.main}
`;

Button.defaultProps = {
    theme: {
        main: "#DBA134"
    }
};

export default Button;