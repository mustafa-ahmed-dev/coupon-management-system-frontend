import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "number" | "search" | "tel" | "url";
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, label, value, name, required, ...rest }, ref) => {
    const isRequired = required ? true : false;

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
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
