import { Link } from "react-router"
import { Heart, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Rate } from "./ui/rate"
import { getProductImage } from "../utils/token"
import type { Product } from "../store/store"

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E"

interface ProductCardProps {
  item: Product
  isFav: boolean
  showDiscount?: boolean
  showColors?: boolean
  colorDots?: string[] | null
  onAddCart: (id: number | string) => void
  onToggleWishlist: (item: Product) => void
}

const ProductCard = ({
  item,
  isFav,
  showDiscount = false,
  showColors = false,
  colorDots = null,
  onAddCart,
  onToggleWishlist,
}: ProductCardProps) => {
  const { t } = useTranslation()

  const id = item.id
  const name = item.productName || "Product"
  const price = Number(item.price) || 0
  const rating = item.rating || 4
  const discount = item.discount || 0
  const image = item.image || ""
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : 0

  return (
    <div className="group relative bg-white flex flex-col justify-between overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-square bg-[#F5F5F5] rounded-md overflow-hidden flex items-center justify-center p-6">
        <img
          src={getProductImage(image)}
          alt={name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />

        {/* Discount badge */}
        {showDiscount && discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#DB4444] text-white font-semibold text-[10px] px-2.5 py-1 rounded-sm shadow-sm">
            -{discount}%
          </div>
        )}

        {/* Hover action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist(item) }}
            className={`w-8 h-8 rounded-full bg-white shadow-md border-none flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer ${isFav ? "text-[#DB4444]" : "text-gray-900"}`}
          >
            <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
          </button>
          <Link to={`/detail/${id}`}>
            <button className="w-8 h-8 rounded-full bg-white text-gray-900 hover:text-[#DB4444] flex items-center justify-center shadow-md border-none outline-none transition-all cursor-pointer">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Slide-up Add To Cart */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddCart(id) }}
          className="absolute bottom-0 left-0 w-full bg-black text-white text-xs font-bold py-3 text-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 cursor-pointer border-none"
        >
          {t("detail.addToCart") || "Add To Cart"}
        </button>
      </div>

      {/* Info area */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-2 hover:text-[#DB4444] transition-colors">
            <Link to={`/detail/${id}`}>{name}</Link>
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-[#DB4444]">${price.toFixed(0)}</span>
            {showDiscount && discount > 0 && (
              <span className="text-xs text-gray-400 line-through font-semibold">
                ${originalPrice.toFixed(0)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Rate value={rating} disabled />
            <span className="text-xs text-gray-500 font-bold">
              ({rating ? Math.floor(rating * 22) : 88})
            </span>
          </div>

          {/* Color dots (optional) */}
          {showColors && colorDots && (
            <div className="flex items-center gap-2 mt-2">
              {colorDots.map((col, idx) => (
                <button
                  key={idx}
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all cursor-pointer bg-white ${idx === 0 ? "border-black" : "border-transparent"}`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full ${col}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
