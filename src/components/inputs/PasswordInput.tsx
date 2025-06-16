import { useState } from "react";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  name: string;
  value?: string;
  required?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, label, value, name, required, ...rest }, ref) => {
    const [isPasswordShown, setShowPassword] = useState<boolean>(false);
    const isRequired = required ? true : false;

    const text = isPasswordShown ? "Hide" : "Show";
    const type: React.InputHTMLAttributes<HTMLInputElement>["type"] =
      isPasswordShown ? "text" : "password";

    const handleShowPassword = () => {
      setShowPassword(!isPasswordShown);
    };

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          name={name}
          required={isRequired}
          {...rest} // This spreads all the react-hook-form props
        />
        <button type="button" onClick={handleShowPassword}>
          {text}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
