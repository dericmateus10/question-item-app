import { FunctionModel } from '@/models/function.model'
import { PerformanceStardardsModel } from '@/models/performance-stardard'
import { SubFunctionModel } from '@/models/sub-function.model'
import { StrapiPaginatedResponse } from '@/types/strapi-paginated-response'
import { CascadingSelectOption } from '../components/molecules/cascading-select'

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


export const adaptPerformanceStardards = (
  serverResponse: StrapiPaginatedResponse<PerformanceStardardsModel>
): CascadingSelectOption[] => {
  return serverResponse.data.map((performanceStardard) => ({
    id: performanceStardard.documentId,
    attributes: {
      name: performanceStardard.description,
    },
  }))
}
