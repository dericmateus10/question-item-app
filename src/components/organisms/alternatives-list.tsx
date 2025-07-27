"use client"

import type React from "react"
import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlternativesListProps {
  control: any
  errors?: any
}

export const AlternativesList: React.FC<AlternativesListProps> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "alternatives",
  })

  const addAlternative = () => {
    append({ textMd: "", isCorrect: false })
  }

  const removeAlternative = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Alternativas
          <Button type="button" variant="outline" size="sm" onClick={addAlternative}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label htmlFor={`alternatives.${index}.textMd`}>Alternativa {String.fromCharCode(65 + index)}</Label>
              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAlternative(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Textarea
              {...control.register(`alternatives.${index}.textMd`)}
              placeholder="Digite o texto da alternativa..."
              className={cn("min-h-[80px]", errors?.alternatives?.[index]?.textMd && "border-destructive")}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                {...control.register(`alternatives.${index}.isCorrect`)}
                id={`alternatives.${index}.isCorrect`}
              />
              <Label htmlFor={`alternatives.${index}.isCorrect`}>Alternativa correta</Label>
            </div>

            {errors?.alternatives?.[index]?.textMd && (
              <p className="text-sm text-destructive">{errors.alternatives[index].textMd.message}</p>
            )}
          </div>
        ))}

        {errors?.alternatives && typeof errors.alternatives === "object" && "message" in errors.alternatives && (
          <p className="text-sm text-destructive">{errors.alternatives.message}</p>
        )}
      </CardContent>
    </Card>
  )
}
