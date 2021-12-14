// import styled from "styled-components/native";
// import { View } from "react-native";
import React from "react";
import { Container, Text } from "../../styles";
import { CloseSvg, ProgressBarSvg } from "../../components";

const CreateAWallet = () =>
    <Container>

        <Container
            flexDirection={"row"}>
            <CloseSvg />
            <ProgressBarSvg />
            <Text
                fontWeight={700}
                color={"#DBA134"}
                fontSize={"12px"}>
                1/3
            </Text>
        </Container>

    </Container>;

export default CreateAWallet;