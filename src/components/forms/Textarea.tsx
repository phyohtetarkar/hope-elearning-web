import { forwardRef } from "react";
import { InputProps } from "./Input";

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
    } = props;
    return (
      <>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          name={name}
          className={`form-control p-3 ${error ? "is-invalid" : ""}`}
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
        {error && <div className="invalid-feedback">{error}</div>}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
