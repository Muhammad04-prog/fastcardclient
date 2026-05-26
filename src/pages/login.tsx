import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosRequest, saveToken } from "../utils/token";
import { useTranslation } from "react-i18next";
import { sileo } from "sileo";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    const obj = {
      userName: target.username.value,
      password: target.password.value,
    };

    setLoading(true);
    try {
      const { data } = await axiosRequest.post(`/Account/login`, obj);
      console.log("Login response:", data);

      // Handle different response shapes from the backend
      const token =
        data?.data ||
        data?.token ||
        data?.accessToken ||
        (typeof data === "string" ? data : null);

      if (data?.statusCode === 200 || token) {
        if (token) saveToken(token);
        sileo.success({
          title: t("login.successTitle") || "Welcome back!",
          description: t("login.successDesc") || "You are now logged in.",
          position: "top-center",
        });
        navigate("/");
      } else {
        sileo.error({
          title: t("login.errorTitle") || "Login failed",
          description: t("login.errorDesc") || "Invalid credentials. Please try again.",
          position: "top-center",
        });
      }
    } catch (error: any) {
      console.error(error);
      sileo.error({
        title: t("login.errorTitle") || "Login failed",
        description:
          error?.response?.data?.message ||
          t("login.errorDesc") ||
          "Something went wrong. Please try again.",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-[75vh] items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-[370px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-black tracking-tight mb-2 leading-none">
            {t("login.title")}
          </h1>
          <p className="text-[14px] text-gray-500 font-normal">
            {t("login.subtitle")}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Username/Email Input with Border Label */}
          <div className="relative mb-5">
            <label className="absolute left-[12px] -top-[8px] bg-white px-1 text-[12px] text-gray-400 font-normal" htmlFor="login-username">
              {i18n.language.startsWith("ru")
                ? "Электронная почта или номер телефона"
                : "Email or phone number"}
            </label>
            <input
              id="login-username"
              type="text"
              name="username"
              className="w-full h-[40px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              required
            />
          </div>

          {/* Password Input with Border Label & Visibility Toggle */}
          <div className="relative mb-5">
            <label className="absolute left-[12px] -top-[8px] bg-white px-1 text-[12px] text-gray-400 font-normal" htmlFor="login-password">
              {t("login.password")}
            </label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full h-[40px] pl-3.5 pr-10 border border-gray-300 rounded-[4px] text-[14px] text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none cursor-pointer flex items-center"
            >
              {showPassword ? (
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Forget Password Link */}
          <div className="text-center mb-6">
            <Link
              to="/forget-password"
              className="text-[#DB4444] text-[14px] font-medium hover:underline transition-colors"
            >
              {t("login.forgetPassword")}
            </Link>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[40px] bg-[#DB4444] hover:bg-[#c23b3b] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-[4px] font-medium text-[14px] cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
            )}
            {loading ? "..." : t("login.login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
