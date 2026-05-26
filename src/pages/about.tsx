
import ImgHeader from "../assets/Side Image.png"
import ImgCruise from "../assets/Frame 874.png"
import ImgEmma from "../assets/Frame 875.png"
import ImgWill from "../assets/Frame 876.png"
import ImgSocially from "../assets/Frame 877.png"
import ImgBox1 from "../assets/Services (1).png"
import ImgBox2 from "../assets/Services (2).png"
import ImgBox3 from "../assets/Services (3).png"
import ImgBox4 from "../assets/Services (4).png"
import ImgService from "../assets/Services.png"
import ImgCustom from "../assets/image copy 7.png"
import ImgGarantee from "../assets/image copy 6.png"
import { useTranslation } from "react-i18next"
const About = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-white text-gray-900">

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{t("about.ourStory")}</h2>
            <p className="leading-relaxed mb-4 text-gray-600">
              {t("about.story1")}
            </p>
            <p className="leading-relaxed text-gray-600">
              {t("about.story2")}
            </p>
          </div>
          <div >
            <img src={ImgHeader} alt="" />
          </div>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">
              <img className="m-auto" src={ImgBox1} alt="" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">10.5k</p>
            <p className="text-gray-600 text-sm">{t("about.sellersActive")}</p>
          </div>
          <div className="bg-red-500 rounded-lg p-8 text-center text-white hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">
              <img className="m-auto" src={ImgBox2} alt="" />
            </div>            <p className="text-3xl font-bold mb-2">33k</p>
            <p className="text-sm">{t("about.monthlySale")}</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">
              <img className="m-auto" src={ImgBox3} alt="" />
            </div>            <p className="text-3xl font-bold text-gray-900 mb-2">45.5k</p>
            <p className="text-gray-600 text-sm">{t("about.customersActive")}</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">
              <img className="m-auto" src={ImgBox4} alt="" />
            </div>            <p className="text-3xl font-bold text-gray-900 mb-2">25k</p>
            <p className="text-gray-600 text-sm">{t("about.annualGross")}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("about.ourTeam")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4 flex justify-center">
              <img src={ImgCruise} alt="" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tom Cruise</h3>
            <p className="text-gray-600 text-sm mb-4">{t("about.chairman")}</p>
            <div className="flex justify-center gap-3 text-red-500">
              <img src={ImgSocially} alt="" />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4 flex justify-center">
              <img src={ImgEmma} alt="" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Emma Watson</h3>
            <p className="text-gray-600 text-sm mb-4">{t("about.managingDirector")}</p>
            <div className="flex justify-center gap-3 text-red-500">
              <img src={ImgSocially} alt="" />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4 flex justify-center">
              <img src={ImgWill} alt="" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Will Smith</h3>
            <p className="text-gray-600 text-sm mb-4">{t("about.productDesigner")}</p>
            <div className="flex justify-center gap-3 text-red-500">
              <img src={ImgSocially} alt="" />
            </div>
          </div>
        </div>
      </div>



      <main className="lg:flex justify-evenly  items-center mt-[100px] mb-[50px] max-w-[1400px] m-auto">
        <div className="w-[300px] m-auto  text-center mt-[40px] lg:mt-[0px]">
          <img className="m-auto" src={ImgService} alt="" />
          <h2 className="text-[20px] font-[600] mt-[20px]">{t("home.deliveryTitle")}</h2>
          <p className="mt-[10px]">{t("home.deliveryDesc")}</p>
        </div>

        <div className="w-[300px] m-auto text-center mt-[40px] lg:mt-[0px]">
          <img className="m-auto w-[80px] h-[80px]" src={ImgCustom} alt="" />
          <h2 className="text-[20px] font-[600] mt-[20px]">{t("home.serviceTitle")}</h2>
          <p className="mt-[10px]">{t("home.serviceDesc")}</p>
        </div>

        <div className="w-[300px] m-auto text-center mt-[40px] lg:mt-[0px]">
          <img className="m-auto w-[80px] h-[80px]" src={ImgGarantee} alt="" />
          <h2 className="text-[20px] font-[600] mt-[20px]">{t("home.guaranteeTitle")}</h2>
          <p className="mt-[10px]">{t("home.guaranteeDesc")}</p>
        </div>
      </main>


      
      

    </div>
  )
}

export default About