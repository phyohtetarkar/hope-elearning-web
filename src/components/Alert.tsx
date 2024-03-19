import { ReactNode } from "react";

interface AlertProps {
  message: ReactNode;
  variant?: "primary" | "info" | "success" | "warning" | "danger";
}

function Alert(props: AlertProps) {
  return (
    <div
      className={`alert alert-${props.variant ?? "info"} py-2h`}
      role="alert"
    >
      {props.message}
    </div>
  );
}

export default Alert;
