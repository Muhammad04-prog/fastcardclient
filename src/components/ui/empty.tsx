import * as React from "react"
import { PackageOpen } from "lucide-react"
import { cn } from "../../utils/cn"

export interface EmptyProps {
  image?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function Empty({
  image,
  description,
  children,
  className
}: EmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto", className)}>
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6 shadow-sm border border-red-100 animate-pulse">
        {image && image !== Empty.PRESENTED_IMAGE_SIMPLE ? (
          image
        ) : (
          <PackageOpen className="w-10 h-10 stroke-[1.5]" />
        )}
      </div>
      
      {description !== undefined && (
        <div className="text-gray-500 text-base font-semibold mb-6">
          {description}
        </div>
      )}
      
      {children && (
        <div className="flex justify-center w-full">
          {children}
        </div>
      )}
    </div>
  )
}

Empty.PRESENTED_IMAGE_SIMPLE = "simple"
