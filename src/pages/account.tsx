import { useEffect } from "react"
import { useNavigate } from "react-router"
import { ToDoAccount } from "../store/account"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useTranslation } from "react-i18next"
import { getProductImage } from "../utils/token"

const Account = () => {
  const { data, loading, error, getData } = ToDoAccount()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("store_token")
    if (!token) {
      navigate("/login")
      return
    }
    getData()
  }, [])

  // Initials avatar fallback
  const initials = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join("") || data?.userName?.[0]?.toUpperCase() || "?"

  const profileRows = [
    { label: t("account.firstName"), value: data?.firstName },
    { label: t("account.lastName"), value: data?.lastName },
    { label: t("account.emailAddress"), value: data?.email },
    { label: t("account.phoneNumber"), value: data?.phoneNumber },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-12 text-gray-600 text-sm">
          <span className="text-gray-400">{t("navbar.home")}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{t("account.title")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div>
            <div className="mb-8">
              <h3 className="font-bold mb-4 text-gray-900">{t("account.manageAccount")}</h3>
              <div className="space-y-2">
                <button className="block w-full text-left px-0 py-2 transition-colors text-red-500 font-semibold">
                  {t("account.myProfile")}
                </button>
                <button className="block w-full text-left px-0 py-2 transition-colors text-gray-600 hover:text-gray-900">
                  {t("account.addressBook")}
                </button>
                <button className="block w-full text-left px-0 py-2 transition-colors text-gray-600 hover:text-gray-900">
                  {t("account.paymentOptions")}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 text-gray-900">{t("account.myOrders")}</h3>
              <div className="space-y-2">
                <button className="block w-full text-left px-0 py-2 transition-colors text-gray-600 hover:text-gray-900">
                  {t("account.myReturns")}
                </button>
                <button className="block w-full text-left px-0 py-2 transition-colors text-gray-600 hover:text-gray-900">
                  {t("account.myCancellations")}
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-gray-900">{t("account.myWishlist")}</h3>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3 space-y-6">

            {/* Loading state */}
            {loading && (
              <div className="rounded-xl p-12 bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-red-100 border-t-red-500 rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading your profile...</p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="rounded-xl p-8 bg-white border border-red-100 shadow-sm">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <Button onClick={getData} className="text-sm">Retry</Button>
              </div>
            )}

            {/* Profile card */}
            {!loading && !error && data && (
              <>
                <div className="rounded-xl p-8 bg-white border border-gray-100 shadow-sm">
                  {/* Avatar + name header */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative flex-shrink-0">
                      {data.image ? (
                        <img
                          src={getProductImage(data.image)}
                          alt={data.userName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-red-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xl font-bold shadow">
                          {initials}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {[data.firstName, data.lastName].filter(Boolean).join(" ") || data.userName}
                      </h2>
                      <p className="text-sm text-gray-500">@{data.userName}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-red-500 mb-6">{t("account.profile")}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileRows.map((item, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium mb-2 text-gray-600">
                          {item.label}
                        </label>
                        <div className="p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 text-sm min-h-[44px] flex items-center">
                          {item.value || <span className="text-gray-400">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Extra fields from API */}
                  {data.dob && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        Date of Birth
                      </label>
                      <div className="p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 text-sm">
                        {data.dob}
                      </div>
                    </div>
                  )}
                </div>

                {/* Password change */}
                <div className="rounded-xl p-8 bg-white border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-8 text-gray-900">
                    {t("account.passwordChanges")}
                  </h3>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-700">
                      {t("account.currentPassword")}
                    </label>
                    <Input.Password
                      id="account-current-password"
                      name="currentPassword"
                      placeholder={t("account.currentPassword")}
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        {t("account.newPassword")}
                      </label>
                      <Input.Password
                        id="account-new-password"
                        name="newPassword"
                        placeholder={t("account.newPassword")}
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        {t("account.confirmPassword")}
                      </label>
                      <Input.Password
                        id="account-confirm-password"
                        name="confirmPassword"
                        placeholder={t("account.confirmPassword")}
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="secondary" className="px-12 font-semibold">
                      {t("account.cancel")}
                    </Button>
                    <Button className="px-12 font-semibold">
                      {t("account.saveChanges")}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Not logged in or no profile */}
            {!loading && !error && !data && (
              <div className="rounded-xl p-12 bg-white border border-gray-100 shadow-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">?</div>
                <p className="text-gray-500 text-sm">No profile found. Please log in again.</p>
                <Button onClick={() => navigate("/login")}>Go to Login</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
