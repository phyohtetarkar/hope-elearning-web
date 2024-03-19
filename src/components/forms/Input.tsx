import {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  KeyboardEvent,
  MouseEvent,
  ReactNode
} from "react";

type OnChange<E> = (e: ChangeEvent<E>) => void;
type OnBlur<E> = (e: FocusEvent<E, Element>) => void;
type OnClick<E> = (e: MouseEvent<E>) => void;
type OnKeyDown<E> = (e: KeyboardEvent<E>) => void;

export interface InputProps<ElementType> {
  label?: ReactNode;
  id?: string;
  name?: string;
  autoComplete?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  error?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  readonly?: boolean;
  autoFocus?: boolean;
  onChange?: OnChange<ElementType>;
  onBlur?: OnBlur<ElementType>;
  onClick?: OnClick<ElementType>;
  onKeyDown?: OnKeyDown<ElementType>;
}

const Input = forwardRef<HTMLInputElement, InputProps<HTMLInputElement>>(
  (props, ref) => {
    const {
      label,
      id,
      type,
      name,
      autoComplete,
      placeholder,
      disabled,
      readonly,
      autoFocus,
      value,
      defaultValue,
      onChange,
      onBlur,
      onClick,
      onKeyDown,
      error,
      className,
      style,
    } = props;

    return (
      <>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          autoComplete={autoComplete}
          className={`form-control px-3 ${error ? "is-invalid" : ""} ${
            className ?? ""
          }`}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          autoFocus={autoFocus}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          style={style}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
