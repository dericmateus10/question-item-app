import { SubFunctionModel } from './sub-function.model'

export type PerformanceStardardsModel = {
  id: number
  documentId: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  code_ref: string
  capabilities_saeps: []
  sub_function_senai: SubFunctionModel
  question_items: []
}
