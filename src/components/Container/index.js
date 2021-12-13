import styled from "styled-components/native";

export const Container = styled.View`
    flex: ${props => props.flex || 1};
    flex-direction: ${props => props.flexDirection || "column"};
    justify-content: ${props => props.justifyContent || "center"};
    align-items: ${props => props.alignItems || "center"};
    background-color: ${props => props.backgroundColor || "#FAFAFA"};
`;