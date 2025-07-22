import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#c3d1e3]">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-10 md:p-16 space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Forgot your password</h2>
          <p className="pt-4 text-base text-gray-700">
            Please enter the email address you'd like your password reset
            information sent to.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-button1"
            required
          />

          <button
            type="submit"
            className="w-full bg-button1 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
