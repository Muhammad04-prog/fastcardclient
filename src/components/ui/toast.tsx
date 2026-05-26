import * as React from "react"
import { createRoot, type Root } from "react-dom/client"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { cn } from "../../utils/cn"

export type ToastType = "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  type: ToastType
  message: string
  duration?: number
}

let toasts: ToastItem[] = []
let setToastsFn: React.Dispatch<React.SetStateAction<ToastItem[]>> | null = null
let rootInstance: Root | null = null

function addToast(type: ToastType, message: string, duration = 3000) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: ToastItem = { id, type, message, duration }

  ensureContainerMounted()

  if (setToastsFn) {
    setToastsFn((prev) => [...prev, newToast])
  } else {
    toasts.push(newToast)
  }

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

function removeToast(id: string) {
  if (setToastsFn) {
    setToastsFn((prev) => prev.filter((t) => t.id !== id))
  } else {
    toasts = toasts.filter((t) => t.id !== id)
  }
}

function ToastContainer() {
  const [localToasts, setLocalToasts] = React.useState<ToastItem[]>(toasts)

  React.useEffect(() => {
    setToastsFn = setLocalToasts
    if (toasts.length > 0) {
      setLocalToasts([...toasts])
      toasts = []
    }
    return () => {
      setToastsFn = null
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .toast-slide-in {
          animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="fixed top-5 right-5 z-[100000] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {localToasts.map((toast) => {
          const Icon = {
            success: CheckCircle2,
            error: AlertCircle,
            warning: AlertCircle,
            info: Info
          }[toast.type]

          const title = {
            success: "Success",
            error: "Error",
            warning: "Warning",
            info: "Notification"
          }[toast.type]

          return (
            <div
              key={toast.id}
              className={cn(
                "relative flex items-start gap-3.5 w-full bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] border p-4 pointer-events-auto transition-all duration-300 overflow-hidden toast-slide-in",
                toast.type === "success" && "border-l-4 border-l-emerald-500 border-y-gray-100 border-r-gray-100",
                toast.type === "error" && "border-l-4 border-l-[#DB4444] border-y-gray-100 border-r-gray-100",
                toast.type === "warning" && "border-l-4 border-l-amber-500 border-y-gray-100 border-r-gray-100",
                toast.type === "info" && "border-l-4 border-l-blue-500 border-y-gray-100 border-r-gray-100"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 mt-0.5",
                  toast.type === "success" && "text-emerald-500",
                  toast.type === "error" && "text-[#DB4444]",
                  toast.type === "warning" && "text-amber-500",
                  toast.type === "info" && "text-blue-500"
                )}
              />
              
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                  {title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {toast.message}
                </p>
              </div>
              
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 shrink-0 cursor-pointer border-none bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>

              {toast.duration && toast.duration > 0 ? (
                <div 
                  className={cn(
                    "absolute bottom-0 left-0 h-[3px] rounded-b-lg",
                    toast.type === "success" && "bg-emerald-500",
                    toast.type === "error" && "bg-[#DB4444]",
                    toast.type === "warning" && "bg-amber-500",
                    toast.type === "info" && "bg-blue-500"
                  )}
                  style={{
                    animation: `shrinkWidth ${toast.duration}ms linear forwards`
                  }}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </>
  )
}

function ensureContainerMounted() {
  if (typeof window === "undefined") return
  let container = document.getElementById("toast-root-container")
  if (!container) {
    container = document.createElement("div")
    container.id = "toast-root-container"
    document.body.appendChild(container)
    rootInstance = createRoot(container)
    rootInstance.render(<ToastContainer />)
  }
}

export const toast = {
  success: (msg: string, duration?: number) => addToast("success", msg, duration),
  error: (msg: string, duration?: number) => addToast("error", msg, duration),
  warning: (msg: string, duration?: number) => addToast("warning", msg, duration),
  info: (msg: string, duration?: number) => addToast("info", msg, duration),
  open: (config: { type: ToastType; content: string; duration?: number }) =>
    addToast(config.type, config.content, config.duration)
}

export const message = {
  success: (msg: string, duration?: number) => addToast("success", msg, duration),
  error: (msg: string, duration?: number) => addToast("error", msg, duration),
  warning: (msg: string, duration?: number) => addToast("warning", msg, duration),
  info: (msg: string, duration?: number) => addToast("info", msg, duration)
}
