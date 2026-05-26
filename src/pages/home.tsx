import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { Truck, ShieldCheck, Headphones } from "lucide-react"
import CategoryC from "../components/categoryC"
import Header from "../components/header"
import ProductC from "../components/productC"
import ProductCard from "../components/ProductCard"
import SectionHeader from "../components/SectionHeader"
import MusicPromo from "../components/MusicPromo"
import NewArrivalShowcase from "../components/NewArrivalShowcase"
import { ToDoData, type Product } from "../store/store"
import { ToDoCart } from "../store/cart"
import { ToDoWishlist } from "../store/wishlist"

// Countdown timer hook — reused for the music promo banner
const useCountdown = () => {
  const [time, setTime] = useState({ days: 5, hours: 23, minutes: 59, seconds: 59 })
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else {
          seconds = 59
          if (minutes > 0) minutes--
          else {
            minutes = 59
            if (hours > 0) hours--
            else { hours = 23; if (days > 0) days-- }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return time
}

// Icon + text block shown at the bottom of the page
const ServiceCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 shadow-sm border border-red-200">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500 font-medium">{desc}</p>
    </div>
  </div>
)

const Home = () => {
  const { t } = useTranslation()
  const { data, getData } = ToDoData()
  const { addCart } = ToDoCart()
  const { initWishlist, isInWishlist, toggleWishlist } = ToDoWishlist()
  const musicTime = useCountdown()

  useEffect(() => {
    getData()
    initWishlist()
  }, [])

  const bestSellers = data ? data.slice(4, 8) : []
  const exploreProducts = data ? data.slice(0, 8) : []

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Banner */}
      <main className="max-w-[1400px] mx-auto px-4">
        <Header />
      </main>

      {/* Flash Sales */}
      <section className="mt-12"><ProductC /></section>

      {/* Category Browser */}
      <section className="mt-12"><CategoryC /></section>

      {/* Best Selling Products */}
      <section className="py-12 border-b border-gray-100 max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader tag={t("home.thisMonth") || "This Month"} title={t("home.bestSelling") || "Best Selling Products"} />
          <Link to="/product">
            <button className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 border-none transition-colors cursor-pointer shadow-sm">
              {t("home.viewAll") || "View All"}
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((item: Product) => (
            <ProductCard key={item.id} item={item} isFav={isInWishlist(item.id)} onAddCart={addCart} onToggleWishlist={toggleWishlist} />
          ))}
        </div>
      </section>

      {/* Music Promo Banner with countdown */}
      <MusicPromo timer={musicTime} />

      {/* Explore Products */}
      <section className="py-12 max-w-[1400px] mx-auto px-4 border-b border-gray-100">
        <div className="mb-10">
          <SectionHeader tag={t("home.ourProducts") || "Our Products"} title={t("home.exploreProducts") || "Explore Our Products"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exploreProducts.map((item: Product) => (
            <ProductCard key={item.id} item={item} isFav={isInWishlist(item.id)} showDiscount onAddCart={addCart} onToggleWishlist={toggleWishlist} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/product">
            <button className="px-10 py-4 bg-[#DB4444] hover:bg-red-600 text-white font-bold rounded-md transition-colors shadow-sm cursor-pointer border-none">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* New Arrival Showcase */}
      <section className="py-12 max-w-[1400px] mx-auto px-4">
        <div className="mb-10">
          <SectionHeader tag={t("home.featured") || "Featured"} title={t("home.newArrival") || "New Arrival"} />
        </div>
        <NewArrivalShowcase />
      </section>

      {/* Services Banner */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <ServiceCard icon={<Truck className="w-8 h-8" />} title={t("home.freeShipping") || "FREE AND FAST DELIVERY"} desc="Free delivery for all orders over $140" />
          <ServiceCard icon={<Headphones className="w-8 h-8" />} title={t("home.support") || "24/7 CUSTOMER SERVICE"} desc="Friendly 24/7 customer support" />
          <ServiceCard icon={<ShieldCheck className="w-8 h-8" />} title={t("home.guarantee") || "MONEY BACK GUARANTEE"} desc="We return money within 30 days" />
        </div>
      </section>
    </div>
  )
}

export default Home