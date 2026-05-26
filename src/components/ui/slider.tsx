import * as React from "react"
import { cn } from "../../utils/cn"

export interface SliderProps {
  range?: boolean
  min?: number
  max?: number
  value?: [number, number] | number
  onChange?: (value: [number, number] | number) => void
  className?: string
}

export function Slider({
  range = false,
  min = 0,
  max = 100,
  value,
  onChange,
  className
}: SliderProps) {
  const isRange = range && Array.isArray(value)
  const valArray = isRange ? (value as [number, number]) : [min, typeof value === "number" ? value : max]

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    const nextMin = Math.min(Number(e.target.value), valArray[1] - 1)
    if (isRange) {
      onChange([nextMin, valArray[1]])
    } else {
      onChange(nextMin)
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    const nextMax = Math.max(Number(e.target.value), valArray[0] + 1)
    if (isRange) {
      onChange([valArray[0], nextMax])
    } else {
      onChange(nextMax)
    }
  }

  const minPercent = ((valArray[0] - min) / (max - min)) * 100
  const maxPercent = ((valArray[1] - min) / (max - min)) * 100

  return (
    <div className={cn("relative w-full h-6 flex items-center select-none touch-none", className)}>
      {/* Background Track */}
      <div className="absolute inset-x-0 h-1 bg-gray-200 rounded-full" />
      
      {/* Active Track Highlight */}
      <div
        className="absolute h-1 bg-red-500 rounded-full"
        style={{
          left: `${isRange ? minPercent : 0}%`,
          right: `${100 - maxPercent}%`
        }}
      />

      {/* Inputs wrapper */}
      <div className="absolute inset-x-0 w-full h-6 pointer-events-none flex items-center">
        {isRange && (
          <input
            type="range"
            min={min}
            max={max}
            value={valArray[0]}
            onChange={handleMinChange}
            className="absolute w-full h-1 pointer-events-auto appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-500 [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-red-500 [&::-moz-range-thumb]:shadow"
            style={{ zIndex: valArray[0] > max - 100 ? 5 : 3 }}
          />
        )}
        <input
          type="range"
          min={min}
          max={max}
          value={valArray[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1 pointer-events-auto appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-500 [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-red-500 [&::-moz-range-thumb]:shadow"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  )
}