interface ProductGalleryProps {
  imageSrc: string;
  productName: string;
  activeThumb: number;
  onThumbClick: (idx: number) => void;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E";

const THUMB_TRANSFORMS = [
  "",
  "rotate-12",
  "-rotate-12 scale-x-[-1]",
  "scale-90 opacity-80",
];

const ProductGallery = ({
  imageSrc,
  productName,
  activeThumb,
  onThumbClick,
}: ProductGalleryProps) => (
  <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
    <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
      {[0, 1, 2, 3].map((idx) => (
        <div
          key={idx}
          onClick={() => onThumbClick(idx)}
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-[121px] md:h-[114px] shrink-0 overflow-hidden rounded-lg bg-[#F5F5F5] flex items-center justify-center p-4 cursor-pointer hover:border-[#DB4444] transition-all border ${activeThumb === idx ? "border-[#DB4444]" : "border-transparent"}`}
        >
          <img
            src={imageSrc}
            alt={`${productName} view ${idx + 1}`}
            className={`max-h-full max-w-full object-contain transition-all duration-300 ${THUMB_TRANSFORMS[idx]}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
        </div>
      ))}
    </div>

    {/* Main large image */}
    <div className="flex-1 aspect-[500/600] md:h-[500px] bg-[#F5F5F5] rounded-lg flex items-center justify-center p-8 group order-1 md:order-2">
      <img
        src={imageSrc}
        alt={productName}
        className={`max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-105 ${THUMB_TRANSFORMS[activeThumb]}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = PLACEHOLDER;
        }}
      />
    </div>
  </div>
);

export default ProductGallery;
