import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "../../utils/cn"

export interface RateProps {
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
  count?: number
  allowHalf?: boolean
}

export function Rate({
  value = 0,
  onChange,
  disabled = false,
  className,
  count = 5,
  allowHalf = false
}: RateProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const stars = Array.from({ length: count }, (_, i) => i + 1)
  const displayValue = hoverValue !== null ? hoverValue : value

  const handleStarClick = (starValue: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !onChange) return
    
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const isLeft = x < rect.width / 2
      onChange(isLeft ? starValue - 0.5 : starValue)
    } else {
      onChange(starValue)
    }
  }

  const handleMouseMove = (starValue: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const isLeft = x < rect.width / 2
      setHoverValue(isLeft ? starValue - 0.5 : starValue)
    } else {
      setHoverValue(starValue)
    }
  }

  const handleMouseLeave = () => {
    if (disabled) return
    setHoverValue(null)
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} onMouseLeave={handleMouseLeave}>
      {stars.map((star) => {
        let fill = 0
        if (displayValue >= star) {
          fill = 1
        } else if (displayValue > star - 1) {
          fill = displayValue - (star - 1)
        }

        return (
          <button
            key={star}
            type="button"
            className={cn(
              "relative p-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 transition-transform duration-100",
              disabled ? "cursor-default" : "cursor-pointer hover:scale-110 active:scale-95"
            )}
            onClick={(e) => handleStarClick(star, e)}
            onMouseMove={(e) => handleMouseMove(star, e)}
            disabled={disabled}
          >
            {/* Background empty star */}
            <Star className="w-4 h-4 text-gray-300 fill-gray-100" />
            
            {/* Foreground filled/half-filled star */}
            {fill > 0 && (
              <div
                className="absolute inset-y-0 left-0 p-0.5 overflow-hidden pointer-events-none"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 max-w-none" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
