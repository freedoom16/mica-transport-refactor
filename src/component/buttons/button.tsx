import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  styleClasses: string;
  isVisible: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  styleClasses,
  isVisible,
  disabled = false,
}) => {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      className={`${styleClasses} ${disabled ? " cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
