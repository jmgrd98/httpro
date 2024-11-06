import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-gray-500 text-gray-500 bg-transparent",
        outlineSuccess:
          "border-2 border-[#188942] text-[#188942] bg-transparent",
        outlineAlert:
          "border-2 border-yellow-500 text-yellow-500 bg-transparent",
        outlinePurple:
          "border-2 border-purple-500 text-purple-500 bg-transparent",
        outlineDestructive:
          "border-2 border-destructive text-destructive-foreground bg-transparent",
        subtle: 
          "bg-muted text-muted-foreground hover:bg-muted/80",
        primary:
          "bg-[#0f4be0] text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: 'bg-[#188942] hover:bg-[#188942]/90',
        alert: 'bg-yellow-500 hover:bg-yellow-500/90',
        purple: 'bg-purple-500 hover:bg-purple-500/90',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
