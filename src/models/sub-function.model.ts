import { FunctionModel } from './function.model'

export type SubFunctionModel = {
  id: number
  documentId: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  code_ref: string
  capabilities_saeps: []
  functions_senai: FunctionModel
  performance_standards: []
  question_items: []
}
