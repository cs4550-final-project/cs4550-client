import * as React from "react";
import MuiButton from "@mui/material/Button";
import { colors } from "../../styles/colors";

type ButtonProps = {
  variant?: "text" | "contained" | "outlined";
  label: string;
  disabled?: boolean | undefined;
  style?: "primary" | "secondary" | "tertiary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: object;
};

const getButtonStyles = (style: string, variant: string) => {
  let styles;
  switch (variant) {
    case "contained":
      styles = {
        backgroundColor: colors[style],
        "&:hover": {
          backgroundColor: colors[`${style}2`],
        },
      };
      break;
    case "outlined":
      styles = {
        color: colors[style],
        border: `1px solid ${colors[style]}`,
        "&:hover": {
          border: `1px solid ${colors[style]}`,
        },
      };
      break;
    case "text":
      styles = {
        color: colors[style],
      };
      break;
  }
  return { ...styles, width: "100%" };
};

const Button = ({
  variant = "contained",
  label,
  disabled = false,
  style = "primary",
  onClick,
  sx,
}: ButtonProps) => {
  const styles = getButtonStyles(style, variant);
  return (
    <MuiButton
      onClick={(e) => {
        onClick && onClick(e);
      }}
      variant={variant}
      disabled={disabled}
      sx={{
        ...styles,
        ...sx,
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
