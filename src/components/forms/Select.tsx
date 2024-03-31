import { forwardRef, ReactNode } from "react";
import { InputProps } from "./Input";

interface SelectInputProps extends InputProps<HTMLSelectElement> {
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const {
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled,
    className,
    children,
    style,
  } = props;

  const isInvalid = !!error;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="font-medium mb-1">{label}</label>}
      <select
        id={id}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`${isInvalid ? "invalid-input" : "default-input"} rounded`}
        style={style}
      >
        {children}
      </select>
      {error && <div className="text-danger text-small mt-1.5">{error}</div>}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
