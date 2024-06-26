import { ButtonHTMLAttributes, ReactNode } from "react";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childern: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ childern, className, width = "w-full", ...rest }: IProps) => {
  return (
    <>
      <button
        className={`${className} ${width} rounded-md text-white p-2`}
        {...rest}
      >
        {childern}
      </button>
    </>
  );
};

export default Button;
