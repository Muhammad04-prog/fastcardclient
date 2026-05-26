import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* Column 1: Exclusive */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6 font-sans">
            {t("footer.name") || "Exclusive"}
          </h2>
          <h3 className="text-lg font-medium text-white mb-4">
            {t("footer.subscribe") || "Subscribe"}
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            {t("footer.discount") || "Get 10% off your first order"}
          </p>
          <div className="relative w-full max-w-[217px] border border-white rounded-[4px] bg-transparent flex items-center pr-3">
            <Input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              variant="borderless"
              className="bg-transparent text-white placeholder-gray-500 text-sm h-11 w-full pl-3.5 focus-visible:outline-none"
            />
            <button className="text-white hover:text-red-500 transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Column 2: Support */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white mb-6 font-sans">
            {t("footer.support") || "Support"}
          </h2>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p className="m-0 max-w-[200px]">
              {t("footer.address") || "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh."}
            </p>
            <a
              href={`mailto:${t("footer.email") || "exclusive@gmail.com"}`}
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.email") || "exclusive@gmail.com"}
            </a>
            <p className="m-0">{t("footer.phone") || "+88015-88888-9999"}</p>
          </div>
        </div>

        {/* Column 3: Account */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white mb-6 font-sans">
            {t("footer.account") || "Account"}
          </h2>
          <div className="space-y-4 text-sm">
            <Link
              to="/account"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.myAccount") || "My Account"}
            </Link>
            <Link
              to="/cart"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.cart") || "Cart"}
            </Link>
            <Link
              to="/wishlist"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.wishlist") || "Wishlist"}
            </Link>
            <Link
              to="/product"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.shop") || "Shop"}
            </Link>
          </div>
        </div>

        {/* Column 4: Quick Link */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white mb-6 font-sans">
            {t("footer.quickLink") || "Quick Link"}
          </h2>
          <div className="space-y-4 text-sm">
            <Link
              to="/privacy"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.privacyPolicy") || "Privacy Policy"}
            </Link>
            <Link
              to="/terms"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.termsOfUse") || "Terms Of Use"}
            </Link>
            <Link
              to="/faq"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.faq") || "FAQ"}
            </Link>
            <Link
              to="/contact"
              className="block text-gray-300 hover:text-red-500 transition-colors no-underline"
            >
              {t("footer.contact") || "Contact"}
            </Link>
          </div>
        </div>

        {/* Column 5: Social */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white mb-6 font-sans">
            {t("footer.social") || "Social"}
          </h2>
          <div className="flex items-center gap-6 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8H7v3h2v9h3v-9h3.5l.5-3H12V6c0-.5.5-1 1-1h2.5V2H13c-2.5 0-4 1.5-4 4v2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="w-full h-px bg-gray-900 mt-16 mb-6" />
      <div className="flex items-center justify-center gap-1.5 text-gray-600 text-sm">
        <span className="text-lg opacity-40">©</span>
        <span className="opacity-40">Copyright Rimel 2022. All right reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
