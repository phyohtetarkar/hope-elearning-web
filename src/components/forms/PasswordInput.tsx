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
    } = props;

    return (
      <>
        {label && <label className="form-label">{label}</label>}
        <div className={`input-group ${error ? "has-validation" : ""}`}>
          <input
            ref={ref}
            id={id}
            type={isPassword ? "password" : "text"}
            name={name}
            autoComplete={autoComplete}
            className={`form-control px-3 ${error ? "is-invalid" : ""}`}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            style={style}
          />
          <div
            className="input-group-text px-3 text-muted"
            role="button"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <RiEyeOffFill size={20} /> : <RiEyeFill size={20} />}
          </div>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
