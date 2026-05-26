import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import Ps5 from "../assets/Frame 684.png"
import WoomenCollection from "../assets/Frame 685.png"
import ImgParfume from "../assets/Frame 687.png"
import speakers from "../assets/Frame 686.png"

interface ShowcaseItemProps {
  src: string
  alt: string
  title: string
  desc: string
  link: string
}

const ShowcaseCard = ({ src, alt, title, desc, link }: ShowcaseItemProps) => {
  const { t } = useTranslation()
  return (
    <div className="relative rounded-3xl overflow-hidden bg-black group shadow-md min-h-[200px]">
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 space-y-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-300 font-medium max-w-xs">{desc}</p>
        <Link to={link} className="text-white hover:text-red-500 underline text-xs font-bold transition-colors">
          {t("home.shopNow") || "Shop Now"}
        </Link>
      </div>
    </div>
  )
}

// Grid of New Arrivals: PS5, Women's Collection, Speakers, Perfume
const NewArrivalShowcase = () => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* PS5 — spans 2 columns */}
      <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-black aspect-[4/3] group shadow-lg">
        <img src={Ps5} alt="PlayStation 5" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 space-y-3">
          <h3 className="text-2xl font-black text-white">PlayStation 5</h3>
          <p className="text-sm text-gray-300 font-medium max-w-sm">Black and White version of the PS5 coming out on sale.</p>
          <Link to="/product?category=Electronics" className="text-white hover:text-red-500 underline text-sm font-bold transition-colors">
            {t("home.shopNow") || "Shop Now"}
          </Link>
        </div>
      </div>

      {/* Right column: Women + Speakers + Perfume */}
      <div className="md:col-span-2 grid grid-rows-2 gap-6">
        <ShowcaseCard
          src={WoomenCollection}
          alt="Women's Collection"
          title={t("home.womenCollection") || "Women's Collection"}
          desc="Featured women collections that give you another vibe."
          link="/product?category=Fashion"
        />
        <div className="grid grid-cols-2 gap-6">
          <ShowcaseCard src={speakers} alt="Speakers" title="Speakers" desc="Amazon wireless speakers." link="/product?category=Electronics" />
          <ShowcaseCard src={ImgParfume} alt="Perfume" title="Perfume" desc="GUCCI INTENSE OUD EDP." link="/product?category=Beauty" />
        </div>
      </div>
    </div>
  )
}

export default NewArrivalShowcase
