import { useEffect, useState, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Link, NavLink, Outlet } from "react-router"
import { Heart, Search, ShoppingCart, User } from "lucide-react"
import Logo from "../assets/Group 1116606595.png"
import ImgBurger from "../assets/image copy.png"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select } from "../components/ui/select"
import { useTheme } from "../context/ThemeContext"
import { ToDoCart, type CartItem } from "../store/cart"
import { ToDoWishlist } from "../store/wishlist"
import Footer from "../components/footer"
import { ThemeToggle, UserDropdown, MobileDrawer, NAV_LINKS } from "../components/navComponents"

const Layout = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data, getData } = ToDoCart()
  const { items: wishlistItems, initWishlist } = ToDoWishlist()

  useEffect(() => {
    getData()
    initWishlist()
  }, [])

  const cartCount = data?.reduce((acc: number, item: CartItem) => acc + (Number(item.quantity) || 1), 0) || 0
  const wishlistCount = wishlistItems?.length || 0
  const currentLanguage = i18n.language ? i18n.language.split("-")[0] : "en"
  const isLoggedIn = Boolean(localStorage.getItem("store_token"))

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">

      {/* Top navigation bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-8 w-auto hover:opacity-80 transition-opacity" src={Logo} alt="Logo" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}
                className={({ isActive }) =>
                  `text-base font-medium pb-1 border-b-2 transition-all duration-300 no-underline ${isActive ? "text-[#DB4444] border-[#DB4444]" : "text-gray-900 border-transparent hover:text-[#DB4444] hover:border-gray-200"}`
                }
              >
                {t(link.label)}
              </NavLink>
            ))}
          </div>

          {/* Right-side icons and controls */}
          <div className="flex items-center gap-4">
            {/* Desktop search */}
            <div className="hidden xl:flex items-center bg-gray-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-red-500 transition-all duration-300">
              <Input id="search-desktop" name="search" placeholder={t("navbar.searchPlaceholder")} variant="borderless" className="w-60 text-sm" suffix={<Search className="w-4 h-4 text-gray-400" />} />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

              <Select
                value={currentLanguage}
                variant="borderless"
                className="w-16 font-bold text-sm"
                onChange={(lang) => i18n.changeLanguage(lang)}
                options={[{ value: "en", label: "EN" }, { value: "ru", label: "RU" }]}
                style={{ minWidth: "70px" }}
              />

              <Link to="/wishlist">
                <Badge count={wishlistCount} className="cursor-pointer hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 hover:text-red-500 transition-colors" />
                </Badge>
              </Link>

              <Link to="/cart">
                <Badge count={cartCount} className="cursor-pointer hover:scale-110 transition-transform">
                  <ShoppingCart className="w-6 h-6 hover:text-red-500 transition-colors" />
                </Badge>
              </Link>

              {isLoggedIn ? (
                <UserDropdown />
              ) : (
                <Link to="/login">
                  <User className="w-6 h-6 hover:text-red-500 transition-colors text-gray-900" />
                </Link>
              )}
            </div>

            {/* Mobile burger button */}
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(true)}>
              <img src={ImgBurger} className="w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <MobileDrawer onClose={() => setIsMobileMenuOpen(false)} theme={theme} toggleTheme={toggleTheme} />
      )}

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-white dark:bg-gray-950 transition-colors duration-300">
              <div className="w-12 h-12 border-4 border-[#DB4444]/20 border-t-[#DB4444] rounded-full animate-spin" />
              <p className="mt-4 text-xs font-semibold text-gray-400 dark:text-gray-600 tracking-widest uppercase animate-pulse">
                Loading...
              </p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
