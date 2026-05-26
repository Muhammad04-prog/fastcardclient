import { useTranslation } from "react-i18next"
import { Link } from "react-router"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Breadcrumb path (Optional visual fluff for a premium store look) */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-20 md:mb-28 self-start max-w-7xl mx-auto px-4 md:px-12">
        <Link to="/" className="hover:text-[#DB4444] transition-colors no-underline text-gray-500">
          {t("common.home") || "Home"}
        </Link>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">404 Error</span>
      </div>

      {/* Main 404 Visual Content */}
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-black dark:text-white m-0 select-none animate-pulse-subtle">
          {t("notfound.title") || "404 Not Found"}
        </h1>
        
        <p className="mt-6 md:mt-10 text-sm md:text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-md md:max-w-xl">
          {t("notfound.subtitle") || "Your visited page not found. You may go home page."}
        </p>

        <Link
          to="/"
          className="mt-10 md:mt-16 px-10 py-4 bg-[#DB4444] hover:bg-[#c33b3b] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/25 active:scale-98 transition-all duration-300 no-underline inline-block text-[15px]"
        >
          {t("notfound.button") || "Back to home page"}
        </Link>
      </div>

      <style>
        {`
          @keyframes pulseSubtle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.97; transform: scale(0.995); }
          }
          .animate-pulse-subtle {
            animation: pulseSubtle 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  )
}

export default NotFound
