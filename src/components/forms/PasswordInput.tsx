"use client";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import { forwardRef, useState } from "react";
import { InputProps } from "./Input";

interface PasswordInputProps extends InputProps<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [isPassword, setIsPassword] = useState(true);

    const {
      label,
      id,
      name,
      autoComplete,
      placeholder,
      disabled,
      value,
      defaultValue,
      onChange,
      onBlur,
      error,
      style,
      className,
    } = props;

    const isInvalid = !!error;

    return (
      <div className={`flex flex-col ${className ?? ""}`}>
        {label && <label className="font-medium mb-1">{label}</label>}
        <div className={`flex rounded ${className ?? ""}`}>
          <input
            ref={ref}
            id={id}
            type={isPassword ? "password" : "text"}
            name={name}
            autoComplete={autoComplete}
            className={`flex-grow ${
              isInvalid
                ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger"
                : "border-gray-300 focus:border-primary"
            } rounded-l focus:ring-0 z-10`}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            style={style}
          />
          <div
            className="border border-l-0 rounded-r px-3 flex items-center bg-gray-100"
            role="button"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <RiEyeOffFill size={20} /> : <RiEyeFill size={20} />}
          </div>
        </div>
        {error && <div className="text-danger text-small mt-1.5">{error}</div>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
