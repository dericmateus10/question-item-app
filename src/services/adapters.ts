import { CascadingSelectOption } from '../components/molecules/cascading-select'
import { FunctionModel } from '@/models/function.model'
import { StrapiPaginatedResponse } from '@/types/strapi-paginated-response'

const adaptFunctions = (
  serverResponse: StrapiPaginatedResponse<FunctionModel>
): CascadingSelectOption[] => {
  return serverResponse.data.map((_function) => ({
    id: _function.documentId,
    attributes: {
      name: _function.description,
    },
  }))
}

export { adaptFunctions }
