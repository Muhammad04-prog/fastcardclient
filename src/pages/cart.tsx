import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { ChevronUp, ChevronDown, ShoppingBag } from "lucide-react"
import { ToDoCart, type CartItem } from "../store/cart"
import { getProductImage } from "../utils/token"
import { Button } from "../components/ui/button"
import { Empty } from "../components/ui/empty"

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E"

// Single row inside the cart table
const CartRow = ({
  item,
  onIncrease,
  onReduce,
  onDelete,
}: {
  item: CartItem
  onIncrease: (id: number | string) => void
  onReduce: (id: number | string) => void
  onDelete: (id: number | string) => void
}) => {
  const { t } = useTranslation()
  const product = item.product
  const name = product?.productName || "Unknown Product"
  const price = product?.price || 0
  const quantity = item.quantity || 1

  return (
    <div className="bg-white rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-10 py-6 grid grid-cols-1 md:grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center gap-6 relative group transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* Product name + image */}
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-md p-1 flex items-center justify-center flex-shrink-0">
          <img
            src={getProductImage(product?.image || "")}
            alt={name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
          />
        </div>
        <span className="font-medium text-gray-900 text-sm">{name}</span>
      </div>

      {/* Price */}
      <div className="text-gray-900 font-medium text-sm">${price.toFixed(0)}</div>

      {/* Quantity spinner */}
      <div className="flex justify-start md:justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 w-20 h-11 select-none bg-white">
          <span className="text-sm font-medium text-gray-900">{String(quantity).padStart(2, "0")}</span>
          <div className="flex flex-col justify-center items-center gap-0.5">
            <button onClick={() => onIncrease(item.id)} className="text-gray-600 hover:text-[#DB4444] transition-colors p-0 cursor-pointer border-none bg-transparent flex items-center justify-center">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button onClick={() => quantity > 1 ? onReduce(item.id) : onDelete(item.id)} className="text-gray-600 hover:text-[#DB4444] transition-colors p-0 cursor-pointer border-none bg-transparent flex items-center justify-center">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row subtotal */}
      <div className="text-left md:text-right md:pr-6 font-bold text-gray-900 text-sm">
        ${(price * quantity).toFixed(0)}
      </div>

      {/* Remove button */}
      <div className="flex justify-end md:justify-start">
        <button
          onClick={() => onDelete(item.id)}
          className="w-6 h-6 rounded-full bg-[#DB4444] text-white flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer border-none shadow-sm"
          title={t("cart.remove") || "Remove"}
        >
          <span className="text-sm font-black select-none leading-none mb-[1.5px]">×</span>
        </button>
      </div>
    </div>
  )
}

// Confirm dialog for clearing the whole cart
const ClearCartDialog = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 text-center max-w-sm w-full mx-4 animate-in fade-in scale-in duration-200">
        <h4 className="font-bold text-gray-900 text-lg mb-2">{t("cart.clearCart") || "Clear Cart"}</h4>
        <p className="text-sm text-gray-500 mb-6">{t("cart.clearCartConfirm") || "Are you sure you want to remove all items?"}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="px-5 py-2.5 rounded-md bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors text-sm border-none cursor-pointer">
            {t("cart.no") || "No"}
          </button>
          <button onClick={onConfirm} className="px-5 py-2.5 rounded-md bg-[#DB4444] hover:bg-red-600 font-bold text-white transition-colors text-sm border-none cursor-pointer">
            {t("cart.yes") || "Yes"}
          </button>
        </div>
      </div>
    </div>
  )
}

const Cart = () => {
  const { t } = useTranslation()
  const { data, getData, deleteCart, increaseCart, reduceCart, clearCart } = ToDoCart()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => { getData() }, [])

  const subtotal = data?.reduce((acc: number, item: CartItem) => acc + (item.product?.price || 0) * (item.quantity || 1), 0) || 0
  const total = subtotal // shipping is free

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 mt-10 bg-white">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className="text-gray-500 text-lg">{t("cart.empty") || "Your cart is empty"}</span>}
        >
          <Link to="/product">
            <Button size="lg" className="bg-[#DB4444] rounded-xl hover:bg-red-600 text-white font-bold border-none cursor-pointer">
              <ShoppingBag className="w-5 h-5 mr-2 inline" />
              {t("cart.continueShopping") || "Continue Shopping"}
            </Button>
          </Link>
        </Empty>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-gray-500 text-sm">
          <Link to="/" className="hover:text-red-500 font-medium text-gray-400 no-underline">{t("navbar.home") || "Home"}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-bold">{t("navbar.cart") || "Cart"}</span>
        </div>

        {/* Table header labels */}
        <div className="hidden md:grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_0.5fr] gap-4 px-10 py-5 text-gray-900 text-sm font-medium mb-4">
          <div>{t("cart.product") || "Product"}</div>
          <div>{t("cart.price") || "Price"}</div>
          <div className="text-center">{t("cart.quantity") || "Quantity"}</div>
          <div className="text-right pr-6">{t("cart.subtotal") || "Subtotal"}</div>
          <div />
        </div>

        {/* Cart rows */}
        <div className="space-y-6">
          {data.map((item: CartItem) => (
            <CartRow
              key={item.id}
              item={item}
              onIncrease={increaseCart}
              onReduce={reduceCart}
              onDelete={deleteCart}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-between gap-4 mt-8">
          <Link to="/product">
            <button className="px-8 py-3 rounded-md bg-white border border-gray-400 text-black font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm">
              {t("cart.returnToShop") || "Return To Shop"}
            </button>
          </Link>
          <div className="flex gap-4">
            <button onClick={() => getData()} className="px-8 py-3 rounded-md bg-white border border-gray-400 text-black font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm">
              {t("cart.update") || "Update Cart"}
            </button>
            <button onClick={() => setShowClearConfirm(true)} className="px-8 py-3 rounded-md bg-white border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer text-sm">
              {t("cart.clearCart") || "Remove all"}
            </button>
          </div>
        </div>

        {/* Coupon + Cart totals */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:max-w-md">
            <input
              id="cart-coupon"
              name="coupon"
              placeholder={t("cart.couponCode") || "Coupon Code"}
              className="flex-1 h-12 px-6 rounded-md border border-gray-400 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
            />
            <button className="h-12 px-10 rounded-md bg-white border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer text-sm whitespace-nowrap">
              {t("cart.applyCoupon") || "Apply"}
            </button>
          </div>

          <div className="bg-white p-8 rounded-md border-2 border-black/85 shadow-sm w-full max-w-md ml-auto">
            <h3 className="text-xl font-bold mb-6 text-gray-900 mt-0">{t("cart.total") || "Cart Total"}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-900 font-medium text-sm">
                <span>{t("cart.subtotal") || "Subtotal"}:</span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <div className="border-t border-gray-200 my-2" />
              <div className="flex justify-between items-center text-gray-900 font-medium text-sm">
                <span>{t("cart.shipping") || "Shipping"}:</span>
                <span>{t("cart.free") || "Free"}</span>
              </div>
              <div className="border-t border-gray-200 my-2" />
              <div className="flex justify-between items-center font-bold text-sm text-gray-900 pt-1 pb-4">
                <span>{t("cart.total") || "Total"}:</span>
                <span>${total.toFixed(0)}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full block">
              <button className="w-full bg-[#DB4444] hover:bg-red-600 text-white font-bold h-12 rounded-md transition-colors cursor-pointer border-none text-sm">
                {t("cart.checkout") || "Proceed to checkout"}
              </button>
            </Link>
          </div>
        </div>

      </div>

      {showClearConfirm && (
        <ClearCartDialog
          onConfirm={() => { clearCart(); setShowClearConfirm(false) }}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  )
}

export default Cart
