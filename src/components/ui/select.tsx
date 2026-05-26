import * as React from "react"
import { cn } from "../../utils/cn"
import { ChevronDown, Check } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  variant?: "default" | "borderless"
  className?: string
  style?: React.CSSProperties
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onChange, options, placeholder, variant = "default", className, style, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Handle click outside to close the dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    const selectedOption = options.find((opt) => opt.value === value)

    const handleOptionClick = (val: string) => {
      if (onChange) {
        onChange(val)
      }
      setIsOpen(false)
    }

    return (
      <div
        ref={(node) => {
          // Handle both forwarded ref and local container ref
          containerRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn("relative inline-block select-none", className)}
        style={style}
        {...props}
      >
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between gap-2 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 font-semibold focus:outline-none outline-none border-none bg-transparent select-none",
            variant === "borderless"
              ? "py-1.5 px-2 hover:bg-gray-50 rounded-lg text-gray-900"
              : "h-11 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-900 shadow-sm hover:border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          )}
        >
          <span>{selectedOption ? selectedOption.label : placeholder || "Select..."}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0",
              isOpen && "rotate-180 text-[#DB4444]"
            )}
          />
        </button>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 min-w-full w-[120px] rounded-xl bg-white border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.1)] py-1.5 px-1 z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOptionClick(opt.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-none flex items-center justify-between gap-2",
                    isSelected
                      ? "bg-red-50 text-[#DB4444]"
                      : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#DB4444]" />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"
