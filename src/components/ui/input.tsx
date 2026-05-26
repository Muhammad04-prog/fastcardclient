import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../../utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode
  variant?: "default" | "borderless"
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", suffix, variant = "default", ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <input
          type={type}
          className={cn(
            variant === "borderless"
              ? "flex h-10 w-full bg-transparent px-1 py-2 text-sm focus-visible:outline-none placeholder:text-gray-400 border-none outline-none"
              : "flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
            suffix && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3.5 flex items-center justify-center pointer-events-none text-gray-400">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
InputComponent.displayName = "Input"

const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    const EyeIcon = show ? Eye : EyeOff
    return (
      <InputComponent
        ref={ref}
        type={show ? "text" : "password"}
        className={cn("pr-10", className)}
        suffix={
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="pointer-events-auto hover:text-gray-600 transition-colors p-0.5 rounded cursor-pointer"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
        }
        {...props}
      />
    )
  }
)
Password.displayName = "Input.Password"

type InputType = typeof InputComponent & {
  Password: typeof Password
}

const Input = InputComponent as InputType
Input.Password = Password

export { Input }

