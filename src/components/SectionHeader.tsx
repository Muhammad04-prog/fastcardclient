interface SectionHeaderProps {
  tag: string;
  title: string;
}

const SectionHeader = ({ tag, title }: SectionHeaderProps) => (
  <div className="mb-2">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-5 h-10 bg-red-500 rounded-[4px]" />
      <p className="text-red-500 font-semibold text-sm m-0">{tag}</p>
    </div>
    <h2 className="text-3xl sm:text-4xl font-extrabold mt-0 text-gray-900 tracking-tight leading-none">
      {title}
    </h2>
  </div>
);

export default SectionHeader;
