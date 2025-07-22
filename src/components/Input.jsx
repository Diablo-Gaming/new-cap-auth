import React from "react";

const Input = ({title, name, id, className, type, ...data }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        {...data}
        name={name}
        placeholder={name}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      />
    </>
  );
};


export default Input;