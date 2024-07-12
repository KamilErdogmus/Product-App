import React from "react";

const Input = ({ placeholder, type, name, id, onChange, value }) => {
  return (
    <div className="w-full">
      {type !== "file" ? (
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
          onChange={onChange}
          value={value || ""}
          className="w-full h-10 px-2 border rounded"
        />
      ) : (
        <>
          <label htmlFor={id} className="cursor-pointer">
            <span className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Choose File
            </span>
          </label>
          <input
            name={name}
            type="file"
            id={id}
            onChange={onChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
};

export default Input;
