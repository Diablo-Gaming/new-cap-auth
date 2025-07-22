import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {signUp} from '../api/auth';

import eye from "../assets/eye.png";
import view from "../assets/view.png";

const Signup = () => {
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
  } = useForm();

  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const sendDataToApi = async (event) => {
    event.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      return alert('All fields are required');
    }
    const data = await signUp(userData);
    if (data) navigate('/login');
  };

  const onInputChange = (event) => {
    const fieldName = event.target.name;
    setUserData({ ...userData, [fieldName]: event.target.value });
  };

  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-[10px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-black shadow-md">
        <h1 className="text-2xl text-center font-semibold">
          Create an account
          <p className="text-2xl mt-1">Join us today.</p>
        </h1>

        <form
          onSubmit={sendDataToApi}
          className="flex flex-col w-full gap-3 mt-6"
        >
          <Input
            name="name"
            type="text"
            className="border rounded-[10px] w-full h-[40px] p-2"
            placeholder="Username"
            onChange={onInputChange}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <Input
            name="email"
            type="email"
            className="border rounded-[10px] w-full h-[40px] p-2"
            placeholder="Email"
            onChange={onInputChange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="border rounded-[10px] w-full h-[40px] p-2"
              placeholder="Password"
              onChange={onInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={handlePasswordVisibility}
            >
              <img
                className="w-6"
                src={showPassword ? view : eye}
                alt="Toggle Password"
              />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-[#f6ca56] mt-6 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-[#828d98] mt-5">
          Already have an account?{" "}
          <Link className="text-black font-semibold" to="/login">
            Login
          </Link>
        </p>

        <hr className="w-full border-black mt-8 border-[1px]" />

        <button className="bg-[#f6ca56] mt-5 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
