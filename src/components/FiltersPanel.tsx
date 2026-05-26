import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router"
import { Rate } from "./ui/rate"
import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import type { Product } from "../store/store"

const CATEGORIES = ["Fashion", "Electronics", "Home", "Medicine", "Sports", "Toys", "Groceries", "Beauty"]

interface FiltersPanelProps {
  priceRange: [number, number]
  setPriceRange: (val: [number, number]) => void
  selectedBrand: string[]
  selectedRating: number | null
  brands: string[]
  data: Product[]
  onClearFilters: () => void
  onToggleBrand: (brand: string) => void
  onSetRating: (stars: number | null) => void
}

// Left sidebar for filtering products by category, price, brand, and rating
const FiltersPanel = ({
  priceRange,
  setPriceRange,
  selectedBrand,
  selectedRating,
  brands,
  data,
  onClearFilters,
  onToggleBrand,
  onSetRating,
}: FiltersPanelProps) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")

  return (
    <div className="space-y-8">
      {/* Category pills */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t("products.categories") || "Categories"}</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = categoryParam?.toLowerCase() === cat.toLowerCase()
            return (
              <button
                key={cat}
                onClick={() => setSearchParams(active ? {} : { category: cat })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${active ? "bg-red-500 text-white border-red-500 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Price range slider */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t("products.priceFilter") || "Price Filter"}</h3>
          <span className="text-sm font-semibold text-red-500">${priceRange[0]} – ${priceRange[1]}</span>
        </div>
        <Slider range min={0} max={1000} value={priceRange} onChange={(val) => setPriceRange(val as [number, number])} className="mb-4" />
      </div>

      {/* Brand checkboxes */}
      {brands.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t("products.brands") || "Brands"}</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {brands.map((brand) => {
              const slug = `brand-${brand.replace(/\s+/g, "-").toLowerCase()}`
              return (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group" htmlFor={slug}>
                  <input id={slug} name="brand" type="checkbox" checked={selectedBrand.includes(brand)} onChange={() => onToggleBrand(brand)} className="w-4 h-4 rounded text-red-500 border-gray-300 focus:ring-red-500 cursor-pointer" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">{brand}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Star rating filter */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t("products.rating") || "Minimum Rating"}</h3>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => onSetRating(selectedRating === stars ? null : stars)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-left cursor-pointer ${selectedRating === stars ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-2">
                <Rate value={stars} disabled />
                <span className="text-xs font-semibold">& Up</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">
                ({data.filter((item) => Math.round(item.rating || 4) >= stars).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={onClearFilters} className="w-full rounded-xl py-3 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold">
        Clear All Filters
      </Button>
    </div>
  )
}

export default FiltersPanel
