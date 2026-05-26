import { useEffect } from "react"
import { ToDoWishlist } from "../store/wishlist"
import { getProductImage } from "../utils/token"
import { Link } from "react-router"
import { Button } from "../components/ui/button"
import { Empty } from "../components/ui/empty"
import { Trash2, ShoppingCart, Eye } from "lucide-react"
import { ToDoCart } from "../store/cart"
import { useTranslation } from "react-i18next"
import { message } from "../components/ui/toast"

const Wishlist = () => {
  const { t } = useTranslation()
  const { items, initWishlist, removeFromWishlist } = ToDoWishlist()
  const { addCart } = ToDoCart()

  useEffect(() => {
    initWishlist()
  }, [])

  const handleMoveAllToCart = async () => {
    if (!items || items.length === 0) return
    let successCount = 0
    for (const item of items) {
      const success = await addCart(item.id)
      if (success) {
        successCount++
        removeFromWishlist(item.id)
      }
    }
    if (successCount > 0) {
      message.success(t("wishlist.movedAll") || `${successCount} items moved to cart successfully`)
    }
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 bg-white">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-500 text-lg">{t("wishlist.empty") || "Your wishlist is empty"}</span>
          }
        >
          <Link to="/product">
            <Button size="lg" className="bg-red-500 rounded-xl hover:bg-red-600">
              <ShoppingCart className="w-5 h-5 mr-2 inline" />
              {t("cart.continueShopping") || "Continue Shopping"}
            </Button>
          </Link>
        </Empty>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm">
          <Link to="/" className="hover:text-red-500">{t("navbar.home")}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t("navbar.wishlist") || "Wishlist"}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("wishlist.title") || "Wishlist"}{" "}
            <span className="text-lg font-medium text-gray-400">({items.length})</span>
          </h1>
          <Button
            onClick={handleMoveAllToCart}
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
          >
            {t("wishlist.moveAll") || "Move All To Bag"}
          </Button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const imageSrc = getProductImage(item.image)
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-200"
              >
                {/* Trash Icon */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm border border-gray-100 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* View Details Link Overlay */}
                <Link
                  to={`/detail/${item.id}`}
                  className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm border border-gray-100 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                </Link>

                {/* Product Image */}
                <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt={item.productName}
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <h3 className="mb-2 text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-red-500 transition-colors">
                    {item.productName}
                  </h3>
                  <p className="mb-4 text-base font-extrabold text-red-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Add To Cart Button */}
                <Button
                  onClick={() => addCart(item.id)}
                  className="w-full bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center gap-2 mt-auto"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {t("wishlist.addToCart") || "Add To Cart"}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Wishlist