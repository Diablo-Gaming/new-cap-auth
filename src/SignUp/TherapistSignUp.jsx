import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import eye from "../assets/eye.png";
import view from "../assets/view.png";

const TherapistSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      setValue("profilePicture", file, { shouldValidate: true });
    } else {
      setProfileImagePreview(null);
      setValue("profilePicture", null, { shouldValidate: true });
    }
  };

  //function to remove the profile picture
  const handleRemoveProfilePicture = () => {
    setProfileImagePreview(null);
    setValue("profilePicture", null);
    const fileInput = document.getElementById("profilePictureInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const sendDataToApi = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "profilePicture" && data.profilePicture) {
          formData.append(key, data.profilePicture);
        } else if (
          key !== "profilePicture" &&
          data[key] !== null &&
          data[key] !== undefined
        ) {
          formData.append(key, data[key]);
        }
      }
      console.log("Form Data being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await fetch("http://localhost:3000/therapist/signup", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "Therapist account created");
        reset();
      } else {
        toast.error(resData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating therapist account");
    }
  };
  const password = watch("password");

  return (
    <div className="flex justify-center px-4 py-12 pt-30 bg-[#bcccdc] min-h-screen">
      {" "}
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-[10px] p-8 sm:p-10 flex flex-col items-center text-black shadow-md">
        <p className="text-2xl mt-1">Join us as a professional</p>

        <form
          onSubmit={handleSubmit(sendDataToApi)}
          className="flex flex-col w-full gap-3 mt-6"
          encType="multipart/form-data"
        >
          {/* Full Name */}
          <Input
            type="text"
            placeholder="Full Name"
            {...register("Full name", { required: "Full name is required" })}
            className="border rounded-[10px] w-full h-[40px] p-2"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}

          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="border rounded-[10px] w-full h-[40px] p-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Phone Number */}
          <Input
            type="tel"
            placeholder="Phone Number"
            {...register("Phone number", {
              required: "Phone number is required",
            })}
            className="border rounded-[10px] w-full h-[40px] p-2"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </span>
          )}

          {/* Specialization */}
          <Input
            type="text"
            placeholder="Specialization / Expertise"
            {...register("Specialization", {
              required: "Specialization is required",
            })}
            className="border rounded-[10px] w-full h-[40px] p-2"
          />
          {errors.specialization && (
            <span className="text-red-500 text-sm">
              {errors.specialization.message}
            </span>
          )}

          {/* License Number */}
          <Input
            type="text"
            placeholder="License / Certification Number"
            {...register("License number", {
              required: "License/Certification number is required",
            })}
            className="border rounded-[10px] w-full h-[40px] p-2"
          />
          {errors.licenseNumber && (
            <span className="text-red-500 text-sm">
              {errors.licenseNumber.message}
            </span>
          )}

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("Password", { required: "Password is required" })}
              className="border rounded-[10px] w-full h-[40px] p-2"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={handlePasswordVisibility}
            >
              <img
                src={showPassword ? view : eye}
                alt="toggle"
                className="w-6"
              />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("Confirm password", {
                required: "Please confirm your password",

                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border rounded-[10px] w-full h-[40px] p-2"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={handleConfirmPasswordVisibility}
            >
              <img
                src={showConfirmPassword ? view : eye}
                alt="toggle"
                className="w-6"
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Profile Picture (Optional) */}
          <label
            htmlFor="profilePictureInput"
            className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 rounded-[10px] px-4 py-2 w-full text-center hover:bg-gray-200 transition duration-200 block"
          >
            Upload Profile Picture (Optional)
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
          {profileImagePreview && (
            <div className="flex items-center gap-4 mt-2">
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveProfilePicture}
                className="px-18 py-2  bg-button1 rounded-md hover:shadow-lg transition duration-200"
              >
                Remove Picture
              </button>
            </div>
          )}
          {/* Bio (Optional) */}
          <textarea
            placeholder="Short Bio / Introduction (optional)"
            {...register("bio")}
            className="border rounded-[10px] w-full h-[80px] p-2 resize-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-button1 mt-4 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-[#828d98] mt-5">
          Already have an account?{" "}
          <Link className="text-black font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TherapistSignUp;
