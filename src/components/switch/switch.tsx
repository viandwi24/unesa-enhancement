import React, { useState } from "react";
import "./switch.css";

function ToggleSwitch(props: {
  value: boolean;
  onToggle: (val: boolean) => void;
}) {
  const [isToggled, setIsToggled] = useState(props.value);
  const onToggle = () => {
    const val = !isToggled;
    setIsToggled(val);
    props.onToggle(val);
  };
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}

export default ToggleSwitch;
