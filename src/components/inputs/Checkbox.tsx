interface CheckboxProps {
  label: string;
  name: string;
  value: string;
}

export function Checkbox({ label, name, value }: CheckboxProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="checkbox" name={name} value={value} />
    </div>
  );
}
