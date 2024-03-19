import { ReactNode } from "react";
import { Button } from "react-aria-components";

interface ProgressButtonProps {
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "danger"
    | "dark"
    | "default"
    | "light";
  theme?: "fill" | "outline";
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function ProgressButton(props: ProgressButtonProps) {
  const {
    type = "button",
    variant = "primary",
    theme = "fill",
    loading,
    className = "",
    onClick,
    disabled,
    children
  } = props;

  return (
    <Button
      type={type}
      className={`btn btn-${
        theme === "outline" ? "outline-" : ""
      }${variant} hstack justify-content-center ${className}`}
      isDisabled={loading || disabled}
      onPress={onClick}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {children}
    </Button>
  );
}

export default ProgressButton;
