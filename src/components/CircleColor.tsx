import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      {...rest}
      style={{ backgroundColor: color, margin: "2px" }}
      className={`w-5 h-5 rounded-full block cursor-pointer`}
    />
  );
};

export default CircleColor;
