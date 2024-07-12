const Button = ({ btnText, onClick, size }) => {
  return (
    <button
      className={`w-full ${size ? "h-6" : "h-10"} ${
        size ? "bg-black" : "bg-indigo-400"
      } grid place-items-center border-transparent hover:bg-indigo-500  hover:ring-2 text-white rounded-md font-bold ${
        size ? `text-[${size}px]` : "text-xl"
      }`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
