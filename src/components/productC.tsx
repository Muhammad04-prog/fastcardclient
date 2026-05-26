import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import ProductCard from "./ProductCard"
import { ToDoData } from "../store/store"
import { ToDoCart } from "../store/cart"
import { ToDoWishlist } from "../store/wishlist"

// Countdown timer helper
const useCountdown = (initial: { days: number; hours: number; minutes: number; seconds: number }) => {
  const [time, setTime] = useState(initial)

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

const TimeUnit = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">{label}</div>
    <span className="text-3xl font-extrabold tracking-tight">
      {String(value).padStart(2, "0")}
    </span>
  </div>
)

const ProductC = () => {
  const { t } = useTranslation()
  const time = useCountdown({ days: 3, hours: 23, minutes: 19, seconds: 56 })
  const { data, getData } = ToDoData()
  const { addCart } = ToDoCart()
  const { initWishlist, isInWishlist, toggleWishlist } = ToDoWishlist()

  useEffect(() => {
    getData()
    initWishlist()
  }, [])

  // First 4 products shown as flash sale items
  const flashSaleProducts = data.slice(0, 4)

  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <main className="max-w-[1400px] mx-auto px-4">

        {/* Header row: title + countdown + view-all button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-10 bg-red-500 rounded-[4px]" />
                <p className="text-red-500 font-semibold text-sm m-0">
                  {t("home.today") || "Today's"}
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-0 text-gray-900 tracking-tight leading-none">
                {t("home.flashSales") || "Flash Sales"}
              </h2>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-4 text-gray-900 select-none">
              <TimeUnit label={t("home.days") || "Days"} value={time.days} />
              <span className="text-red-500 text-2xl font-bold mt-4">:</span>
              <TimeUnit label={t("home.hours") || "Hours"} value={time.hours} />
              <span className="text-red-500 text-2xl font-bold mt-4">:</span>
              <TimeUnit label={t("home.minutes") || "Minutes"} value={time.minutes} />
              <span className="text-red-500 text-2xl font-bold mt-4">:</span>
              <TimeUnit label={t("home.seconds") || "Seconds"} value={time.seconds} />
            </div>
          </div>

          <Link to="/product">
            <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 text-gray-800 font-bold px-6">
              {t("home.viewAll") || "View All Products"}
            </Button>
          </Link>
        </div>

        {/* Flash sale product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              isFav={isInWishlist(item.id)}
              showDiscount
              onAddCart={addCart}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProductC