import type React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface MarkdownEditorProps {
  name: string
  label: string
  control: any
  placeholder?: string
  className?: string
  error?: string
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  name,
  label,
  control,
  placeholder,
  className,
  error,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            className={cn("min-h-[120px] font-mono text-sm", error && "border-destructive")}
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
