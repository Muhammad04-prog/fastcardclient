import { useState } from "react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { CheckCircle2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { message } from "../components/ui/toast"
import { ToDoCart, type CartItem } from "../store/cart"
import { getProductImage } from "../utils/token"
import { BILLING_FIELDS, type FormKey } from "../utils/billingFields"

const inputCls =
  "w-full h-[50px] px-5 border border-gray-200 rounded-[4px] focus:outline-none focus:border-[#DB4444] text-sm text-gray-900 placeholder-gray-400 bg-white transition-all"

type FormData = Record<FormKey, string> & { paymentMethod: string }

// Radio button for selecting a payment method
const PaymentRadio = ({
  id, value, label, checked, onChange, children,
}: {
  id: string; value: string; label: string; checked: boolean; onChange: () => void; children?: React.ReactNode
}) => (
  <label className="flex items-center justify-between cursor-pointer py-1" htmlFor={id}>
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <input id={id} type="radio" name="paymentMethod" value={value} checked={checked} onChange={onChange}
          className="peer appearance-none w-[20px] h-[20px] border-2 border-gray-400 rounded-full checked:border-[#DB4444] transition-all cursor-pointer bg-white"
        />
        <div className="absolute w-[10px] h-[10px] rounded-full bg-[#DB4444] hidden peer-checked:block pointer-events-none" />
      </div>
      <span className="text-sm font-medium text-gray-900 select-none">{label}</span>
    </div>
    {children}
  </label>
)

// Small payment brand logos row
const CardLogos = () => (
  <div className="flex gap-2 items-center">
    <div className="h-5 w-8 bg-[#E2125B] rounded-[2px] flex items-center justify-center text-[7px] text-white font-bold px-0.5 tracking-tighter">bkash</div>
    <svg className="h-5 w-8 rounded-[2px]" viewBox="0 0 36 24" fill="none">
      <rect width="36" height="24" rx="2" fill="#0E4595"/>
      <path d="M12.9 16.2H14.8L16 11.2H14.1L12.9 16.2ZM19.6 11.3C19.2 11.1 18.6 10.9 17.9 10.9C16.2 10.9 15 11.8 15 13.1C15 14.1 15.9 14.6 16.6 14.9C17.3 15.2 17.5 15.4 17.5 15.7C17.5 16.2 16.9 16.4 16.3 16.4C15.4 16.4 14.8 16.1 14.4 15.9L14 17.5C14.5 17.7 15.4 17.9 16.3 17.9C18.2 17.9 19.5 17 19.5 15.5C19.5 14.2 18.7 13.7 17.5 13.1C16.8 12.8 16.4 12.6 16.4 12.2C16.4 11.8 16.8 11.5 17.7 11.5C18.4 11.5 18.9 11.7 19.3 11.9L19.6 11.3ZM23.4 11.2L21.8 16.2H23.5L25.1 11.2H23.4ZM29.2 11.2H27.7C27.2 11.2 26.8 11.5 26.6 11.9L23.9 17.9H25.8L26.2 16.7H28.5L28.7 17.9H30.5L29.2 11.2ZM26.7 15.2L27.6 12.7L28.1 15.2H26.7ZM9 11.2L7.3 15C7.1 14.5 6.6 11.9 6.6 11.9C6.3 11.4 5.8 11.2 5.3 11.2H3.5L3.4 11.5C4.5 11.8 5.6 12.5 6.3 13.1L8 17.9H9.9L12.9 11.2H9Z" fill="white"/>
    </svg>
    <svg className="h-5 w-8 rounded-[2px]" viewBox="0 0 36 24" fill="none">
      <rect width="36" height="24" rx="2" fill="#1A1A1A"/>
      <circle cx="15.5" cy="12" r="7" fill="#EB001B"/>
      <circle cx="20.5" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
    <div className="h-5 w-8 bg-[#F47321] rounded-[2px] flex items-center justify-center text-[7px] text-white font-bold px-0.5 tracking-tighter">nagad</div>
  </div>
)

// Shown after a successful order
const OrderSuccess = ({ total }: { total: number }) => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("checkout.orderConfirmed") || "Order Confirmed!"}</h2>
        <p className="text-gray-600 mb-8">{t("checkout.thankYou") || "Thank you for your purchase."}</p>
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <p className="text-sm text-gray-600 mb-2"><strong>{t("checkout.orderTotal") || "Order Total:"}</strong></p>
          <p className="text-3xl font-bold text-[#DB4444]">${total.toFixed(0)}</p>
        </div>
        <p className="text-gray-600 mb-6">🎉 {t("checkout.confirmationEmailSent") || "A confirmation email has been sent"}</p>
        <Link to="/" className="block">
          <Button size="lg" className="h-12 w-full font-bold bg-[#DB4444] hover:bg-[#E03A3A] text-white border-none cursor-pointer rounded-[4px]">
            {t("cart.continueShopping") || "Continue Shopping"}
          </Button>
        </Link>
      </div>
    </div>
  )
}

const Checkout = () => {
  const { t } = useTranslation()
  const { data: cartItems } = ToDoCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [saveInfo, setSaveInfo] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", address: "",
    apartment: "", city: "", phoneNumber: "", paymentMethod: "cod",
  })

  const subtotal = cartItems?.reduce((sum: number, item: CartItem) => sum + (item.product?.price || 0) * (item.quantity || 1), 0) || 0
  const total = subtotal

  const updateForm = (key: keyof FormData, value: string) => setFormData({ ...formData, [key]: value })

  const handlePlaceOrder = () => {
    const required: FormKey[] = ["firstName", "lastName", "email", "address", "city", "phoneNumber"]
    if (required.some((k) => !formData[k])) {
      message.error(t("checkout.fillFieldsError") || "Please fill in all required fields")
      return
    }
    setOrderPlaced(true)
    setTimeout(() => message.success(t("checkout.orderPlacedSuccess") || "Order placed successfully!"), 500)
  }

  const handleApplyCoupon = () => {
    couponCode.trim()
      ? message.success(t("cart.couponAppliedSuccess") || "Coupon applied!")
      : message.error(t("cart.couponEmptyError") || "Please enter a coupon code")
  }

  if (orderPlaced) return <OrderSuccess total={total} />

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-gray-500 text-sm">
          <Link to="/products" className="hover:text-[#DB4444] font-medium text-gray-400 no-underline">Product</Link>
          <span className="text-gray-400">/</span>
          <Link to="/cart" className="hover:text-[#DB4444] font-medium text-gray-400 no-underline">View Cart</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-bold">CheckOut</span>
        </div>

        <h1 className="text-[36px] font-semibold text-gray-900 mb-10 leading-none tracking-tight">Billing Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

          {/* Left: billing form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-8 sm:p-10 space-y-6">
              {BILLING_FIELDS.map(({ id, name, type, labelKey, fallback }) => (
                <input key={id} id={id} name={name} type={type}
                  placeholder={t(labelKey) || fallback}
                  value={formData[name]}
                  onChange={(e) => updateForm(name, e.target.value)}
                  className={inputCls}
                />
              ))}

              {/* Save info checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center justify-center cursor-pointer">
                  <input type="checkbox" id="save-info" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)}
                    className="peer appearance-none w-[24px] h-[24px] border border-gray-300 rounded checked:bg-[#DB4444] checked:border-[#DB4444] transition-all cursor-pointer"
                  />
                  <svg className="absolute w-[14px] h-[14px] text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <label htmlFor="save-info" className="text-sm font-medium text-gray-900 cursor-pointer select-none leading-none">
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-5">
            <div className="space-y-6">

              {/* Cart item list */}
              <div className="space-y-6">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-[54px] h-[54px] bg-white border border-gray-100 rounded-[4px] p-1 flex items-center justify-center flex-shrink-0">
                          <img src={getProductImage(item.product?.image || "")} alt={item.product?.productName || ""} className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{item.product?.productName || "Unknown Product"}</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">${((item.product?.price || 0) * (item.quantity || 1)).toFixed(0)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">{t("checkout.noItems") || "No items in cart"}</p>
                )}
              </div>

              {/* Pricing totals */}
              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center text-gray-900 text-sm">
                  <span>Subtotal:</span><span className="font-medium">${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-900 text-sm pb-4 border-b border-gray-100">
                  <span>Shipping:</span><span className="font-medium">Free</span>
                </div>
                <div className="pt-2 flex justify-between items-center text-gray-900 text-sm">
                  <span>Total:</span><span className="text-[20px] font-bold">${total.toFixed(0)}</span>
                </div>
              </div>

              {/* Payment method selection */}
              <div className="space-y-4 pt-6">
                <PaymentRadio id="payment-bank" value="bank" label="Bank" checked={formData.paymentMethod === "bank"} onChange={() => updateForm("paymentMethod", "bank")}>
                  <CardLogos />
                </PaymentRadio>
                <PaymentRadio id="payment-cod" value="cod" label="Cash on delivery" checked={formData.paymentMethod === "cod"} onChange={() => updateForm("paymentMethod", "cod")} />
              </div>

              {/* Coupon input */}
              <div className="flex gap-4 pt-4">
                <input id="checkout-coupon" name="couponCode" type="text" placeholder="Coupon Code"
                  value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-[50px] px-5 border border-gray-300 rounded-[4px] focus:outline-none focus:border-[#DB4444] text-sm placeholder-gray-400 bg-white"
                />
                <button onClick={handleApplyCoupon} className="h-[50px] px-10 border border-[#DB4444] text-[#DB4444] font-medium rounded-[4px] hover:bg-red-50 transition-all text-sm whitespace-nowrap bg-white cursor-pointer">
                  Apply
                </button>
              </div>

              {/* Place order */}
              <div className="pt-4">
                <button onClick={handlePlaceOrder} disabled={!cartItems || cartItems.length === 0}
                  className="h-[56px] px-12 bg-[#DB4444] hover:bg-[#E03A3A] text-white font-medium rounded-[4px] transition-all text-base border-none cursor-pointer shadow-sm active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
