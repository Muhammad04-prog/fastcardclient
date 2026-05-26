import { Moon, Search, Sun, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, NavLink } from "react-router"
import Logo from "../assets/Group 1116606595.png"
import { Input } from "./ui/input"

const NAV_LINKS = [
  { to: "/", label: "navbar.home", end: true },
  { to: "/login", label: "navbar.login" },
  { to: "/contact", label: "navbar.contact" },
  { to: "/about", label: "navbar.about" },
  { to: "/signup", label: "navbar.signup" },
]

// Animated sun/moon button for switching light and dark mode
export const ThemeToggle = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <button onClick={toggleTheme} aria-label="Toggle theme"
    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:text-[#DB4444] hover:bg-red-50 transition-all duration-300 cursor-pointer border-none shadow-sm focus:outline-none"
  >
    <div className="relative w-5 h-5 flex items-center justify-center">
      <Sun className={`w-5 h-5 absolute transition-all duration-500 transform ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`} />
      <Moon className={`w-5 h-5 absolute transition-all duration-500 transform ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
    </div>
  </button>
)

// User account dropdown shown when logged in
export const UserDropdown = () => {
  const { t } = useTranslation()

  const ProfileSvg = ({ size = "w-4 h-4" }: { size?: string }) => (
    <svg className={`${size} text-white`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )

  return (
    <div className="relative group flex items-center h-full">
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ef4444] text-white hover:bg-red-600 transition-all duration-300 cursor-pointer border-none outline-none focus:outline-none">
        <ProfileSvg />
      </button>
      {/* Wrapper with padding-top bridges the gap so hover isn't lost */}
      <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 origin-top-right z-50">
        <div className="w-56 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 shadow-2xl py-2 px-1 text-white flex flex-col gap-0.5">
          <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white">
            <ProfileSvg size="w-5 h-5" />
            <span>{t("navbar.account")}</span>
          </Link>
          <button
            onClick={() => { localStorage.removeItem("store_token"); window.location.href = "/login" }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-left text-white cursor-pointer bg-transparent border-none outline-none"
          >
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>{t("navbar.logout")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Slide-in mobile navigation drawer
export const MobileDrawer = ({ onClose, theme, toggleTheme }: { onClose: () => void; theme: string; toggleTheme: () => void }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-full max-w-[280px] flex-col bg-white p-6 shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onClose} className="no-underline">
            <img className="h-6 w-auto" src={Logo} alt="Logo" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={onClose}
              className={({ isActive }) => `text-base font-semibold transition-all duration-300 no-underline pl-2 border-l-2 ${isActive ? "text-[#DB4444] border-[#DB4444]" : "text-gray-900 border-transparent hover:text-[#DB4444]"}`}
            >
              {t(link.label)}
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-red-500 transition-all duration-300">
            <Input id="search-mobile" name="search" placeholder={t("navbar.searchPlaceholder")} variant="borderless" className="w-full text-sm" suffix={<Search className="w-4 h-4 text-gray-400" />} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { NAV_LINKS }
