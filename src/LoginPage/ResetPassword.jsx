import React from "react";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#c3d1e3]">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-10 md:p-16 space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset your password</h2>
          <p className="pt-4 text-base text-gray-700">Enter a new password</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* New Password */}
          <input
            type="password"
            id="new-password"
            placeholder="Enter a new password"
            className="w-full px-5 py-3 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-button1"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            className="w-full px-5 py-3 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-button1"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-button1 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
