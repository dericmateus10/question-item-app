'use client'

import type React from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { cn } from '@/lib/utils'

interface CascadingSelectProps {
  name: string
  label: string
  control: any
  options: Array<{ id: string; attributes: { name: string } }>
  placeholder?: string
  className?: string
  error?: string
  isLoading?: boolean
  onValueChange?: (value: string) => void
  disabled?: boolean
}

export const CascadingSelect: React.FC<CascadingSelectProps> = ({
  name,
  label,
  control,
  options,
  placeholder,
  className,
  error,
  isLoading,
  onValueChange,
  disabled,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              onValueChange?.(value)
            }}
            disabled={disabled || isLoading}
          >
            <SelectTrigger className={cn(error && 'border-destructive')}>
              <SelectValue
                placeholder={isLoading ? 'Carregando...' : placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.id}
                >
                  {option.attributes.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  )
}
