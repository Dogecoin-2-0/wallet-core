import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const ProgressBarSvg = () => (
    <Svg
        width={271}
        height={8}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M0 4a4 4 0 0 1 4-4h263a4 4 0 0 1 0 8H4a4 4 0 0 1-4-4Z"
            fill="#F5F5F5"
        />
        <Rect width={90.335} height={8.001} rx={4} fill="#0A0A0A" />
    </Svg>
);

export default ProgressBarSvg;
