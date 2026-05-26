import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import axios from "axios"
import { url, getProductImage } from "../utils/token"
import { ToDoCart } from "../store/cart"
import { ToDoWishlist } from "../store/wishlist"
import { ToDoData, type Product } from "../store/store"
import ProductCard from "../components/ProductCard"
import ProductGallery from "../components/ProductGallery"
import { Button } from "../components/ui/button"
import { Rate } from "../components/ui/rate"
import { Heart, Truck, RotateCcw, ArrowLeft, Plus, Minus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { message } from "../components/ui/toast"

const Detail = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { addCart, increaseCart } = ToDoCart()
  const { toggleWishlist, isInWishlist, initWishlist } = ToDoWishlist()
  const { data, getData } = ToDoData()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeThumb, setActiveThumb] = useState(0)
  const [selectedColor, setSelectedColor] = useState("blue")
  const [selectedSize, setSelectedSize] = useState("M")

  useEffect(() => {
    initWishlist()
    getData()
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${url}/Product/get-product-by-id?id=${id}`)
        setProduct(res.data?.data || res.data)
      } catch {
        message.error("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!product) return
    const ok = await addCart(product.id)
    if (ok && quantity > 1) {
      for (let i = 0; i < quantity - 1; i++) await increaseCart(product.id)
    }
    message.success(t("cart.added") || "Added to cart successfully")
  }

  const handleToggleWishlist = () => {
    if (!product) return
    toggleWishlist(product)
    message.success(isInWishlist(product.id) ? t("wishlist.removed") || "Removed" : t("wishlist.added") || "Added to wishlist")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 font-medium">{t("common.loading") || "Loading..."}</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("detail.notFound") || "Product Not Found"}</h2>
        <Link to="/product">
          <Button className="bg-red-500 rounded-xl">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t("common.goBack") || "Back to Products"}
          </Button>
        </Link>
      </div>
    )
  }

  const imageSrc = getProductImage(product.image)
  const isWish = isInWishlist(product.id)
  const isOutOfStock = product.stock !== undefined && product.stock <= 0

  // Build related products: same category first, then fill from anywhere
  const related = data.filter((p: Product) => p.category === product.category && p.id !== product.id).slice(0, 4)
  if (related.length < 4) {
    const others = data.filter((p: Product) => p.id !== product.id && !related.some((r) => r.id === p.id))
    related.push(...others.slice(0, 4 - related.length))
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-gray-400 text-sm font-medium">
          <Link to="/" className="hover:text-red-500 transition-colors">{t("navbar.account") || "Home"}</Link>
          <span>/</span>
          <Link to="/product" className="hover:text-red-500 capitalize transition-colors">{product.category || "Products"}</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">{product.productName}</span>
        </div>

        {/* Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ProductGallery imageSrc={imageSrc} productName={product.productName} activeThumb={activeThumb} onThumbClick={setActiveThumb} />

          {/* Info panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{product.productName}</h1>

              <div className="flex items-center gap-4 mb-4">
                <Rate value={product.rating || 4} disabled />
                <span className="text-sm text-gray-500">({product.rating ? Math.floor(product.rating * 30) : 150} Reviews)</span>
                <span className="text-gray-300">|</span>
                <span className={`text-sm font-semibold ${isOutOfStock ? "text-red-500" : "text-[#00FF66]"}`}>
                  {isOutOfStock ? t("detail.outOfStock") || "Out of Stock" : t("detail.inStock") || "In Stock"}
                </span>
              </div>

              <div className="text-2xl font-semibold text-gray-900 mb-4">${product.price.toFixed(2)}</div>

              <p className="text-sm text-gray-700 leading-relaxed mb-6 border-b border-gray-300 pb-6">
                {product.description || "High quality product with excellent performance and durability."}
              </p>

              {!isOutOfStock && (
                <>
                  {/* Color picker */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xl text-gray-900 font-medium">Colours:</span>
                    <div className="flex items-center gap-2">
                      {[{ value: "blue", bg: "#A0B0C0" }, { value: "red", bg: "#DB4444" }].map(({ value, bg }) => (
                        <button key={value} onClick={() => setSelectedColor(value)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedColor === value ? "ring-2 ring-black" : ""}`}
                          style={{ borderColor: "transparent" }}
                        >
                          <span className="w-5 h-5 rounded-full border border-gray-400 block" style={{ background: bg }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size picker */}
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-xl text-gray-900 font-medium">Size:</span>
                    <div className="flex items-center gap-2">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <button key={size} onClick={() => setSelectedSize(size)}
                          className={`w-10 h-8 rounded border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${selectedSize === size ? "bg-[#DB4444] border-[#DB4444] text-white" : "border-gray-300 hover:border-gray-400 text-gray-900 bg-white"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity + Add to cart */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10 bg-white">
                      <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 border-none bg-transparent cursor-pointer text-gray-800 border-r border-gray-300">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center font-bold text-gray-900 text-sm select-none">{quantity}</span>
                      <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center bg-[#DB4444] text-white border-none cursor-pointer hover:bg-red-600 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <Button onClick={handleAddToCart} className="bg-[#DB4444] hover:bg-red-600 text-white rounded-md h-10 px-12 font-bold text-sm">
                      {t("detail.buyNow") || "Buy Now"}
                    </Button>
                    <button onClick={handleToggleWishlist}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all cursor-pointer ${isWish ? "border-red-200 bg-red-50 text-red-500" : "border-gray-300 bg-white text-gray-900 hover:text-red-500 hover:bg-gray-50"}`}
                    >
                      <Heart className={`w-5 h-5 ${isWish ? "fill-current text-[#DB4444]" : "text-gray-900"}`} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Delivery info */}
            <div className="border border-gray-300 rounded-md divide-y divide-gray-300 mt-2">
              <div className="p-4 flex items-center gap-4">
                <Truck className="w-10 h-10 text-gray-900 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-gray-900">Free Delivery</h4>
                  <p className="text-xs text-gray-700 font-medium"><span className="underline cursor-pointer">Enter your postal code for Delivery Availability</span></p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <RotateCcw className="w-10 h-10 text-gray-900 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-gray-900">Return Delivery</h4>
                  <p className="text-xs text-gray-700 font-medium">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-gray-100 pt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 m-0 tracking-wide">{t("detail.relatedItems") || "Related Items"}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} item={item} isFav={isInWishlist(item.id)} showDiscount onAddCart={addCart} onToggleWishlist={toggleWishlist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail