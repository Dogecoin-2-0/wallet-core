import React, { useState } from "react";
import { Switch } from "react-native";

const ToggleSwitch = () => {

    const [isToggled, setIsToggled] = useState(false);
    const toggle = () => setIsToggled(previousState => !previousState);

    return (
        <Switch
            trackColor={{ true: "#DBA134", false: "#CCCCCC" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CCCCCC"
            onValueChange={toggle}
            value={isToggled}
        />
    );
};

export default ToggleSwitch;