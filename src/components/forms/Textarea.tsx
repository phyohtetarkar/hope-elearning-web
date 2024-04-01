import { forwardRef } from "react";
import { InputProps } from "./input";

interface TextareaInputProps extends InputProps<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (props, ref) => {
    const {
      label,
      id,
      name,
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
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label htmlFor={id} className="font-medium mb-1">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          name={name}
          className={`${isInvalid ? "invalid-input" : "default-input"} rounded`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            height: 120,
            ...style,
          }}
        />
        {error && <div className="text-danger text-sm mt-1.5">{error}</div>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
