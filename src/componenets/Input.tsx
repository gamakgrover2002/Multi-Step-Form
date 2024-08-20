import { Data } from "../model/Data";
import { ControllerRenderProps } from "react-hook-form";

interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  field: ControllerRenderProps<Data, keyof Data>;
  readOnly?: boolean; // Updated to camelCase
}

const Input: React.FC<InputProps> = ({
  type,
  className,
  placeholder,
  field,
  readOnly = false, // Updated to camelCase
}) => {
  const stringValue =
    typeof field.value === "string" ? field.value : JSON.stringify(field.value);

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...field}
      value={stringValue} // Ensure the value is a string
      readOnly={readOnly} // Updated to camelCase
    />
  );
};

export default Input;
