'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApiData } from '@/hooks/useApiData'
import { useQuestionForm } from '@/hooks/useQuestionForm'
import { Loader2 } from 'lucide-react'
import type React from 'react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { CascadingSelect } from '../../components/molecules/cascading-select'
import { MarkdownEditor } from '../../components/molecules/markdown-editor'
import { MultiSelect } from '../../components/molecules/multi-select'
import { AlternativesList } from '../../components/organisms/alternatives-list'

export const QuestionForm: React.FC = () => {
  const { form, handleSubmit, isLoading } = useQuestionForm()
  const {
    functions,
    capabilitiesSaep,
    capabilities,
    knowledges,
    isLoading: isDataLoading,
    getSubFunctions,
    getPerformanceStandards,
  } = useApiData()

  const watchedFunctionId = form.watch('functionId')
  const watchedSubFunctionId = form.watch('subFunctionId')
  const watchedCapabilitiesSaepId = form.watch('capabilitiesSaepId')
  const watchedCapabilityId = form.watch('capabilityId')

  // const subFunctionsQuery = useQuery(getSubFunctions(watchedFunctionId))
  // const performanceStandardsQuery = useQuery(
  //   getPerformanceStandards(watchedSubFunctionId)
  // )

  // Reset dependent fields when parent changes
  // useEffect(() => {
  //   if (watchedFunctionId) {
  //     form.setValue('subFunctionId', '')
  //     form.setValue('performanceStandardId', '')
  //   }
  // }, [watchedFunctionId, form])

  // useEffect(() => {
  //   if (watchedSubFunctionId) {
  //     form.setValue('performanceStandardId', '')
  //   }
  // }, [watchedSubFunctionId, form])

  // // XOR logic for capabilities
  // useEffect(() => {
  //   if (watchedCapabilitiesSaepId) {
  //     form.setValue('capabilityId', '')
  //   }
  // }, [watchedCapabilitiesSaepId, form])

  // useEffect(() => {
  //   if (watchedCapabilityId) {
  //     form.setValue('capabilitiesSaepId', '')
  //   }
  // }, [watchedCapabilityId, form])

  if (isDataLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Carregando dados...</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      {/* Campos Markdown */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da Questão</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <MarkdownEditor
            name='textMd'
            label='Texto da Questão'
            control={form.control}
            placeholder='Digite o texto da questão em Markdown...'
            error={form.formState.errors.textMd?.message}
          />

          <MarkdownEditor
            name='contextMd'
            label='Contexto'
            control={form.control}
            placeholder='Digite o contexto da questão em Markdown...'
            error={form.formState.errors.contextMd?.message}
          />

          <MarkdownEditor
            name='commandMd'
            label='Comando'
            control={form.control}
            placeholder='Digite o comando da questão em Markdown...'
            error={form.formState.errors.commandMd?.message}
          />
        </CardContent>
      </Card>

      {/* Dificuldade */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='difficulty'>Dificuldade</Label>
            <Controller
              name='difficulty'
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione a dificuldade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='FACIL'>Fácil</SelectItem>
                    <SelectItem value='MEDIO'>Médio</SelectItem>
                    <SelectItem value='DIFICIL'>Difícil</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.difficulty && (
              <p className='text-sm text-destructive'>
                {form.formState.errors.difficulty.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selects Encadeados */}
      <Card>
        <CardHeader>
          <CardTitle>Classificação Funcional</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CascadingSelect
            name='functionId'
            label='Função'
            control={form.control}
            options={functions}
            placeholder='Selecione uma função'
            error={form.formState.errors.functionId?.message}
          />

          <CascadingSelect
            name='subFunctionId'
            label='Subfunção'
            control={form.control}
            options={[]}
            placeholder='Selecione uma subfunção'
            error={form.formState.errors.subFunctionId?.message}
            isLoading={false}
            disabled={!watchedFunctionId}
          />

          <CascadingSelect
            name='performanceStandardId'
            label='Padrão de Performance'
            control={form.control}
            options={[]}
            placeholder='Selecione um padrão de performance'
            error={form.formState.errors.performanceStandardId?.message}
            isLoading={false}
            disabled={!watchedSubFunctionId}
          />
        </CardContent>
      </Card>

      {/* Capabilities XOR */}
      <Card>
        <CardHeader>
          <CardTitle>Capacidades (selecione apenas uma opção)</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CascadingSelect
            name='capabilitiesSaepId'
            label='Capabilities SAEP'
            control={form.control}
            options={capabilitiesSaep}
            placeholder='Selecione uma capability SAEP'
            error={form.formState.errors.capabilitiesSaepId?.message}
            disabled={!!watchedCapabilityId}
          />

          <CascadingSelect
            name='capabilityId'
            label='Capability'
            control={form.control}
            options={capabilities}
            placeholder='Selecione uma capability'
            error={form.formState.errors.capabilityId?.message}
            disabled={!!watchedCapabilitiesSaepId}
          />
        </CardContent>
      </Card>

      {/* Multiselect de Conhecimento */}
      <Card>
        <CardHeader>
          <CardTitle>Conhecimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <MultiSelect
            name='knowledgeIds'
            label='Conhecimentos Relacionados'
            control={form.control}
            options={knowledges}
            placeholder='Selecione os conhecimentos'
            error={form.formState.errors.knowledgeIds?.message}
          />
        </CardContent>
      </Card>

      {/* Lista de Alternativas */}
      <AlternativesList
        control={form.control}
        errors={form.formState.errors}
      />

      {/* Botão de Submit */}
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isLoading}
          size='lg'
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Criar Item de Avaliação
        </Button>
      </div>
    </form>
  )
}
