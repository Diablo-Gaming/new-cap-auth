import { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logIn } from "../api/auth";
import { useAuth } from "../context/auth";

import eye from "../assets/eye.png";
import view from "../assets/view.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
  } = useForm();


const handleSubmit = async (event) => {
  try {
    event.preventDefault();
    setLoading(true);

    if (!loginData.email || !loginData.password) {
      return alert('All fields are required');
    }

    const data = await logIn(loginData);
    const accessToken = data?.accessToken;

    if (!accessToken) {
      toast.error("Login failed. No access token received.");
      return;
    }

    
    login(accessToken);
    toast.success("You are logged in successfully.");

    navigate('/');

  } catch (error) {
    console.log("Login user api hit failed...");
    console.log(error);
    toast.error(error?.response?.data?.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-[10px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-black shadow-md">
        <h1 className="text-2xl text-center">
          Welcome back. Your well-being
          <p className="text-2xl">starts here.</p>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[5px]"
        >
          <Input
            name="email"
            type="email"
            className="border rounded-[10px] w-full h-[40px] p-2 mt-4"
            onChange={onInputChange}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="border rounded-[10px] w-full h-[40px] p-2 mt-4"
              onChange={onInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="bg-[#f6ca56] mt-10 w-[300px] h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-[#828d98] mt-5">
          Don't have an account?{" "}
          <Link className="text-black font-semibold" to="/signup">
            Signup
          </Link>
        </p>
        <hr className="w-[340px] border-black mt-5 border-[1px]" />
        <button className="bg-[#f6ca56] mt-5 w-[300px] h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300">
          Continue with Google
        </button>
        <Link to="/forgotPw" className="font-bold hover:underline mt-5">
          Forgot password?
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
