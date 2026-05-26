import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { axiosRequest } from "../utils/token";
import { sileo } from "sileo";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: { value: string };
      emailOrPhone: { value: string };
      password: { value: string };
    };

    const emailOrPhone = target.emailOrPhone.value.trim();
    const isEmail = emailOrPhone.includes("@");

    const obj = {
      userName: target.username.value,
      phoneNumber: isEmail ? "992900000000" : emailOrPhone,
      email: isEmail ? emailOrPhone : `${emailOrPhone}@fastcard.com`,
      password: target.password.value,
      confirmPassword: target.password.value,
    };

    try {
      const { data } = await axiosRequest.post(`/Account/register`, obj);

      if (data.statusCode === 200 || data.data) {
        sileo.success({
          title: t("signup.accountCreated"),
          description: t("signup.accountCreatedDesc"),
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      sileo.error({
        title: t("signup.signupFailed"),
        description: t("signup.signupFailedDesc"),
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex w-full min-h-[75vh] items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-[370px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-500">
        
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-black tracking-tight mb-2 leading-none">
            {t("signup.title")}
          </h1>
          <p className="text-[14px] text-gray-500 font-normal">
            {t("signup.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            id="signup-username"
            type="text"
            name="username"
            placeholder={i18n.language.startsWith('ru') ? 'Имя' : 'Name'}
            className="w-full h-[40px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black mb-4 transition-all placeholder:text-gray-400"
            required
          />

          <input
            id="signup-email-phone"
            type="text"
            name="emailOrPhone"
            placeholder={i18n.language.startsWith('ru') ? 'Электронная почта или номер телефона' : 'Email or phone number'}
            className="w-full h-[40px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black mb-4 transition-all placeholder:text-gray-400"
            required
          />

          <input
            id="signup-password"
            type="password"
            name="password"
            placeholder={t("signup.password")}
            className="w-full h-[40px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] text-black bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black mb-4 transition-all placeholder:text-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full h-[40px] bg-[#DB4444] hover:bg-[#c23b3b] text-white rounded-[4px] font-medium text-[14px] mb-4 cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center"
          >
            {t("signup.signup")}
          </button>

          <button
            type="button"
            className="w-full h-[40px] bg-white border border-gray-300 hover:bg-gray-50 text-[14px] font-normal rounded-[4px] flex items-center justify-center gap-2.5 text-black mb-8 cursor-pointer transition-all active:scale-[0.98]"
          >
            <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>{t("signup.signupWithGoogle")}</span>
          </button>
        </form>

        <div className="text-[14px] text-center text-gray-500 font-normal">
          {t("signup.haveAccount")}{" "}
          <Link
            to="/login"
            className="text-black font-medium underline underline-offset-4 hover:text-[#DB4444] transition-colors ml-1"
          >
            {t("signup.login")}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;