import { QuestionItemModel } from './question-item.model'
import { SubFunctionModel } from './sub-function.model'

export type FunctionModel = {
  id: number
  documentId: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  code_ref: string
  sub_function_senais: SubFunctionModel[]
  question_items: QuestionItemModel[]
}
