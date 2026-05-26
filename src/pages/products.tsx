import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useSearchParams } from "react-router"
import axios from "axios"
import { url, getProductImage } from "../utils/token"
import { ToDoData, type Product } from "../store/store"
import { ToDoCart } from "../store/cart"
import { ToDoWishlist } from "../store/wishlist"
import { Rate } from "../components/ui/rate"
import { Select } from "../components/ui/select"
import { Button } from "../components/ui/button"
import FiltersPanel from "../components/FiltersPanel"
import { Eye, Heart, SlidersHorizontal, X } from "lucide-react"

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E"

// Single product card for the product grid
const ProductItem = ({
  item, isFav, onToggleWishlist, onAddCart,
}: {
  item: Product; isFav: boolean
  onToggleWishlist: (item: Product) => void
  onAddCart: (id: number | string) => void
}) => {
  const { t } = useTranslation()
  const price = Number(item.price) || 0
  const discount = item.discount || 0
  const rating = item.rating || 4

  return (
    <div className="group relative bg-white flex flex-col justify-between overflow-hidden">
      <div className="relative aspect-square bg-[#F5F5F5] rounded-md overflow-hidden flex items-center justify-center p-6">
        <img src={getProductImage(item.image || "")} alt={item.productName || "Product"}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
        {discount > 0 && <div className="absolute top-3 left-3 bg-[#DB4444] text-white font-semibold text-[10px] px-2.5 py-1 rounded-sm shadow-sm">-{discount}%</div>}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist(item) }}
            className={`w-8 h-8 rounded-full bg-white shadow-md border-none flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer ${isFav ? "text-[#DB4444]" : "text-gray-900"}`}>
            <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
          </button>
          <Link to={`/detail/${item.id}`}>
            <button className="w-8 h-8 rounded-full bg-white text-gray-900 hover:text-[#DB4444] flex items-center justify-center shadow-md border-none outline-none transition-all cursor-pointer">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddCart(item.id) }}
          className="absolute bottom-0 left-0 w-full bg-black text-white text-xs font-bold py-3 text-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 cursor-pointer border-none">
          {t("detail.addToCart") || "Add To Cart"}
        </button>
      </div>
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-2 hover:text-[#DB4444] transition-colors">
            <Link to={`/detail/${item.id}`}>{item.productName || "Product"}</Link>
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-[#DB4444]">${price.toFixed(0)}</span>
            {discount > 0 && <span className="text-xs text-gray-400 line-through font-semibold">${(price / (1 - discount / 100)).toFixed(0)}</span>}
          </div>
          <div className="flex items-center gap-1.5">
            <Rate value={rating} disabled />
            <span className="text-xs text-gray-500 font-bold">({rating ? Math.floor(rating * 22) : 88})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Products = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [filteredData, setFilteredData] = useState<Product[]>([])
  const [sortType, setSortType] = useState("popular")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [allBrands, setAllBrands] = useState<{ id: number; brandName: string }[]>([])

  const { data, getData } = ToDoData()
  const { addCart } = ToDoCart()
  const { initWishlist, isInWishlist, toggleWishlist } = ToDoWishlist()

  const brands = Array.from(new Set(
    data?.map((item: Product) => {
      const b = allBrands.find((br) => br.id === item.brandId)
      return b ? b.brandName : "Unknown"
    }).filter((b) => b !== "Unknown") || []
  ))

  useEffect(() => {
    getData()
    initWishlist()
    axios.get(`${url}/Brand/get-brands`)
      .then((res) => setAllBrands(res.data?.data?.brands || res.data?.data || []))
      .catch((err) => console.error("Error fetching brands:", err))
  }, [])

  useEffect(() => {
    let result = [...data]
    if (categoryParam) {
      result = result.filter((item) => {
        const cat = item.categoryName || item.category || ""
        return cat.toLowerCase().includes(categoryParam.toLowerCase()) || categoryParam.toLowerCase().includes(cat.toLowerCase())
      })
    }
    result = result.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])
    if (selectedBrand.length > 0) {
      result = result.filter((item) => {
        const b = allBrands.find((br) => br.id === item.brandId)
        return selectedBrand.includes(b ? b.brandName : "Unknown")
      })
    }
    if (selectedRating) result = result.filter((item) => Math.round(item.rating || 4) >= selectedRating)
    if (sortType === "price-low") result.sort((a, b) => a.price - b.price)
    else if (sortType === "price-high") result.sort((a, b) => b.price - a.price)
    else if (sortType === "rating") result.sort((a, b) => (b.rating || 4) - (a.rating || 4))
    setFilteredData(result)
  }, [data, categoryParam, priceRange, selectedBrand, selectedRating, sortType, allBrands])

  const toggleBrand = (brand: string) => {
    setSelectedBrand((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])
  }

  const handleClearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedRating(null)
    setSelectedBrand([])
    setSearchParams({})
  }

  // Shared filter props passed to both desktop sidebar and mobile drawer
  const filterProps = { priceRange, setPriceRange, selectedBrand, selectedRating, brands, data, onClearFilters: handleClearFilters, onToggleBrand: toggleBrand, onSetRating: setSelectedRating }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header: breadcrumb + sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div className="text-gray-500 text-sm">
            <Link to="/" className="hover:text-red-500">{t("navbar.home")}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{categoryParam || "All Products"}</span>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 transition-all font-semibold text-sm cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">{t("products.sortBy") || "Sort By"}</span>
              <Select value={sortType} onChange={setSortType} style={{ width: "180px" }}
                options={[{ value: "popular", label: "Popularity" }, { value: "price-low", label: "Price: Low to High" }, { value: "price-high", label: "Price: High to Low" }, { value: "rating", label: "Customer Rating" }]}
              />
            </div>
          </div>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="hidden lg:block lg:col-span-1 border-r border-gray-100 pr-8">
            <FiltersPanel {...filterProps} />
          </aside>

          <main className="lg:col-span-3">
            {filteredData.length === 0 ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-10">
                <p className="text-gray-500 text-lg font-medium mb-2">No Products Match Your Filters</p>
                <p className="text-gray-400 text-sm mb-6">Try broadening your parameters or clear all filters.</p>
                <Button onClick={handleClearFilters} className="bg-red-500 rounded-xl">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  <ProductItem key={item.id} item={item} isFav={isInWishlist(item.id)} onToggleWishlist={toggleWishlist} onAddCart={addCart} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h2>
              <button onClick={() => setShowMobileFilters(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 flex items-center justify-center border-none bg-transparent cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FiltersPanel {...filterProps} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Products