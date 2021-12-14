import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CloseSvg = () => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="m7 7 10 10M7 17 17 7"
            stroke="#0A0A0A"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default CloseSvg;
