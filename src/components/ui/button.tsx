import * as React from "react"
import { cn } from "../../utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
          // Variants
          variant === "default" && "bg-red-500 text-white hover:bg-red-600 shadow-md border-none",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 shadow-md border-none",
          variant === "outline" && "border border-gray-200 bg-white hover:bg-gray-50 text-gray-800",
          variant === "secondary" && "bg-gray-100 text-gray-900 hover:bg-gray-200 border-none",
          variant === "ghost" && "hover:bg-gray-50 hover:text-gray-900 border-none",
          variant === "link" && "text-red-500 underline-offset-4 hover:underline border-none bg-transparent",
          // Sizes
          size === "default" && "h-11 px-6 py-2.5",
          size === "sm" && "h-9 rounded-lg px-3 text-xs",
          size === "lg" && "h-14 rounded-2xl px-10 text-base",
          size === "icon" && "h-10 w-10 p-0 rounded-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
