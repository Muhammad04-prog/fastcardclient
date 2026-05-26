import * as React from "react"
import { cn } from "../../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
  count?: number | string
  dot?: boolean
}

export function Badge({
  className,
  variant = "default",
  count,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  if (children) {
    return (
      <div className={cn("relative inline-flex shrink-0", className)} {...props}>
        {children}
        {dot ? (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
        ) : count !== undefined && count !== null && count !== 0 && count !== "0" && count !== "" ? (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold h-5 min-w-[20px] px-1 ring-2 ring-white shadow-sm leading-none transition-all duration-200">
            {count}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "default" && "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        variant === "secondary" && "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        variant === "destructive" && "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        variant === "outline" && "text-gray-900 border border-gray-200",
        className
      )}
      {...props}
    >
      {count !== undefined ? count : null}
    </span>
  )
}
