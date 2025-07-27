'use client'

import { CommandEmpty } from '../../../components/ui/command'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '../../../components/ui/label'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import {
  Command,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../../components/ui/command'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface MultiSelectProps {
  name: string
  label: string
  control: any
  options: Array<{ id: string; attributes: { name: string } }>
  placeholder?: string
  className?: string
  error?: string
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  control,
  options,
  placeholder,
  className,
  error,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedOptions = options.filter((option) =>
            field.value?.includes(option.id)
          )

          return (
            <div className='space-y-2'>
              <Popover
                open={open}
                onOpenChange={setOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className={cn(
                      'w-full justify-between',
                      error && 'border-destructive'
                    )}
                  >
                    {selectedOptions.length > 0
                      ? `${selectedOptions.length} selecionado(s)`
                      : placeholder}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandInput placeholder='Buscar conhecimento...' />
                    <CommandList>
                      <CommandEmpty>
                        Nenhum conhecimento encontrado.
                      </CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.id}
                            onSelect={() => {
                              const currentValue = field.value || []
                              const newValue = currentValue.includes(option.id)
                                ? currentValue.filter(
                                    (id: string) => id !== option.id
                                  )
                                : [...currentValue, option.id]
                              field.onChange(newValue)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value?.includes(option.id)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {option.attributes.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedOptions.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {selectedOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant='secondary'
                      className='text-xs'
                    >
                      {option.attributes.name}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='ml-1 h-auto p-0 text-muted-foreground hover:text-foreground'
                        onClick={() => {
                          const newValue = field.value.filter(
                            (id: string) => id !== option.id
                          )
                          field.onChange(newValue)
                        }}
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  )
}
