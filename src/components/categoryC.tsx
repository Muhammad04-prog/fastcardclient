import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { CATEGORY_ICONS } from "./categoryIcons"

// Each category shows a translated label and maps to a search filter
const CATEGORIES = [
  { labelKey: "header.text1", searchName: "Fashion",     iconKey: "Fashion"     },
  { labelKey: "header.text2", searchName: "Fashion",     iconKey: "Women"       },
  { labelKey: "header.text3", searchName: "Electronics", iconKey: "Electronics" },
  { labelKey: "header.text4", searchName: "Home",        iconKey: "Home"        },
  { labelKey: "header.text5", searchName: "Medicine",    iconKey: "Medicine"    },
  { labelKey: "header.text6", searchName: "Sports",      iconKey: "Sports"      },
  { labelKey: "header.text7", searchName: "Toys",        iconKey: "Toys"        },
  { labelKey: "header.text9", searchName: "Groceries",   iconKey: "Groceries"   },
  { labelKey: "header.text8", searchName: "Beauty",      iconKey: "Beauty"      },
]

const NavArrow = ({ dir }: { dir: "left" | "right" }) => (
  <button className="w-[46px] h-[46px] bg-gray-100 hover:bg-gray-200 text-black rounded-full shadow-sm flex items-center justify-center transition-all cursor-pointer border-none">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      {dir === "left"
        ? <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        : <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      }
    </svg>
  </button>
)

const CategoryC = () => {
  const { t } = useTranslation()

  return (
    <div className="py-12 border-b border-gray-100 bg-white">

      {/* Section header */}
      <div className="w-full px-4 lg:flex items-end justify-between max-w-[1400px] m-auto mb-10">
        <div>
          <div className="flex items-center gap-[10px] mb-2">
            <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
            <p className="text-[#DB4444] font-semibold text-[16px] m-0">{t("home.categories")}</p>
          </div>
          <h2 className="text-[36px] font-bold mt-0 text-black tracking-tight leading-none">
            {t("home.browseByCategory")}
          </h2>
        </div>

        <div className="flex gap-2.5 mt-4 lg:mt-0">
          <NavArrow dir="left" />
          <NavArrow dir="right" />
        </div>
      </div>

      {/* Category grid */}
      <div className="w-full max-w-[1400px] m-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4 justify-center">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/product?category=${encodeURIComponent(cat.searchName)}`}
              className="group border border-gray-200 hover:border-[#DB4444] hover:bg-[#DB4444] hover:shadow-lg rounded-[4px] py-7 px-2 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center bg-white no-underline"
            >
              <div className="mb-4">{CATEGORY_ICONS[cat.iconKey]}</div>
              <h2 className="text-[14px] font-medium text-black group-hover:text-white transition-colors duration-300 m-0 line-clamp-2">
                {t(cat.labelKey)}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryC
