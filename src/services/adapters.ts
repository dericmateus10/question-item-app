import { CascadingSelectOption } from '../components/molecules/cascading-select'
import { FunctionModel } from '@/models/function.model'
import { SubFunctionModel } from '@/models/sub-function.model'
import { StrapiPaginatedResponse } from '@/types/strapi-paginated-response'

export const adaptFunctions = (
  serverResponse: StrapiPaginatedResponse<FunctionModel>
): CascadingSelectOption[] => {
  return serverResponse.data.map((_function) => ({
    id: _function.documentId,
    attributes: {
      name: _function.description,
    },
  }))
}

export const adaptSubFunctions = (
  serverResponse: StrapiPaginatedResponse<SubFunctionModel>
): CascadingSelectOption[] => {
  return serverResponse.data.map((subFunction) => ({
    id: subFunction.documentId,
    attributes: {
      name: subFunction.description,
    },
  }))
}
