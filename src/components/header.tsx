import { useTranslation } from "react-i18next";
import ImgIhone from "../assets/1200px-Apple_gray_logo 1.png";
import ImgApple from "../assets/hero_endframe__cvklg0xk3w6e_large 2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  const { t } = useTranslation();

  const categoriesList = [
    { labelKey: "header.text1", searchName: "Fashion", hasChevron: true },
    { labelKey: "header.text2", searchName: "Fashion", hasChevron: true },
    { labelKey: "header.text3", searchName: "Electronics", hasChevron: false },
    { labelKey: "header.text4", searchName: "Home", hasChevron: false },
    { labelKey: "header.text5", searchName: "Medicine", hasChevron: false },
    { labelKey: "header.text6", searchName: "Sports", hasChevron: false },
    { labelKey: "header.text7", searchName: "Toys", hasChevron: false },
    { labelKey: "header.text9", searchName: "Groceries", hasChevron: false },
    { labelKey: "header.text8", searchName: "Beauty", hasChevron: false },
  ];

  const bgColors = ["bg-zinc-900", "bg-neutral-900", "bg-stone-900"];

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[250px_1fr] gap-10 mt-10">
        <aside className="hidden lg:block border-r border-gray-100 pr-10">
          <div className="flex flex-col gap-[18px]">
            {categoriesList.map((cat, idx) => (
              <Link
                key={idx}
                to={`/product?category=${encodeURIComponent(cat.searchName)}`}
                className="flex justify-between items-center group cursor-pointer no-underline"
              >
                <h2 className="text-[15px] font-medium text-gray-700 group-hover:text-[#DB4444] transition-colors m-0">
                  {t(cat.labelKey)}
                </h2>
                {cat.hasChevron && (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#DB4444] transition-colors" />
                )}
              </Link>
            ))}
          </div>
        </aside>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            className="h-full aspect-[2.4/1]"
          >
            {bgColors.map((bg, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`w-full h-full flex flex-col md:flex-row items-center justify-between px-10 md:px-20 text-white ${bg}`}
                >
                  <div className="flex flex-col gap-6 md:w-1/2 py-10">
                    <div className="flex items-center gap-4 animate-fadeIn">
                      <img
                        src={ImgIhone}
                        alt="iPhone"
                        className="h-10 w-auto"
                      />
                      <p className="text-lg font-medium opacity-80">
                        iPhone 14 Series
                      </p>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter whitespace-pre-line">
                      {t("header.name1")}
                    </h1>

                    <Link
                      to="/product"
                      className="group flex items-center gap-2 mt-4 text-lg font-bold border-b-2 border-white/50 w-fit pb-1 hover:border-white transition-all"
                    >
                      <span>{t("header.p1")}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="md:w-1/2 flex items-center justify-center py-10">
                    <img
                      src={ImgApple}
                      alt="Apple Device"
                      className="max-h-[300px] w-auto drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)] animate-float"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      <style>
        {`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .swiper-pagination-bullet-active { background: #fff !important; }
                `}
      </style>
    </div>
  );
};

export default Header;
