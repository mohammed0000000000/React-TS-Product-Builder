interface IProp {
  msg: string;
}
const ErrorMsg = ({ msg }: IProp) => {
  return msg ? (
    <span className="block text-red-500 text-sm font-semibold">
      {"* " + msg}
    </span>
  ) : null;
};

export default ErrorMsg;
