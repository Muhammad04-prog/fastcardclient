import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import ImgVoicer from "../assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1 (1).png"

interface MusicPromoProps {
  timer: { days: number; hours: number; minutes: number; seconds: number }
}

const MusicPromo = ({ timer }: MusicPromoProps) => {
  const { t } = useTranslation()

  const timeUnits = [
    { label: t("home.days") || "Days",    value: timer.days    },
    { label: t("home.hours") || "Hours",   value: timer.hours   },
    { label: t("home.minutes") || "Minutes", value: timer.minutes },
    { label: t("home.seconds") || "Seconds", value: timer.seconds },
  ]

  return (
    <section className="my-16 max-w-[1400px] mx-auto px-4">
      <div className="lg:flex justify-between items-center bg-black rounded-3xl p-10 lg:p-16 gap-8 shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Text + timer */}
        <div className="z-10 relative space-y-6 max-w-lg">
          <span className="text-red-500 font-bold tracking-wider text-sm uppercase">
            {t("home.categories") || "Categories"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            {t("home.enhanceMusic") || "Enhance Your Music Experience"}
          </h2>

          <div className="flex flex-wrap gap-4 pt-4">
            {timeUnits.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black shadow">
                <span className="text-xl sm:text-2xl font-black leading-none">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link to="/product?category=Electronics">
              <button className="px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-extrabold transition-all border-none cursor-pointer shadow-md">
                {t("home.buyNow") || "Buy Now!"}
              </button>
            </Link>
          </div>
        </div>

        {/* Speaker image */}
        <div className="z-10 relative mt-10 lg:mt-0 max-w-md w-full flex justify-center items-center">
          <img
            className="w-full max-h-[350px] object-contain drop-shadow-[0_20px_50px_rgba(239,68,68,0.3)] animate-pulse"
            src={ImgVoicer}
            alt="JBL Enhancer"
          />
        </div>
      </div>
    </section>
  )
}

export default MusicPromo
