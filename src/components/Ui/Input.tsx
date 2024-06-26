import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1
      focus:ring-indigo-500 rounded-md p-1 text-md"
      {...rest}
    />
  );
};

export default Input;
