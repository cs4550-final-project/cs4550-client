import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = ({
  options,
  value,
  setValue,
}: {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {options.map((option) => (
        <ToggleButton value={option.value} aria-label={option.label}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
