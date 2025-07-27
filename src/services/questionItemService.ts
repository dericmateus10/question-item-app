import { FunctionModel } from '@/models/function.model'
import { StrapiPaginatedResponse } from '@/types/strapi-paginated-response'
import { adaptFunctions, adaptSubFunctions } from './adapters'
import api from './api'
import { CascadingSelectOption } from '../components/molecules/cascading-select'
import { SubFunctionModel } from '@/models/sub-function.model'

export const questionItemService = {
  // Buscar funções
  getFunctions: async (): Promise<CascadingSelectOption[]> => {
    const response = await api.get(
      '/functions-senais?sort[0]=description:asc&populate=*&pagination[pageSize]=999&pagination[page]=1'
    )

    return adaptFunctions(
      response.data as StrapiPaginatedResponse<FunctionModel>
    )
  },

  // Buscar subfunções por função
  getSubFunctions: async (
    functionId: string
  ): Promise<CascadingSelectOption[]> => {
    const response = await api.get(
      `/sub-function-senais?filters[functions_senai][documentId][$eq]=${functionId}&populate=*&sort[0]=description:asc`
    )

    const subFunctions = adaptSubFunctions(
      response.data as StrapiPaginatedResponse<SubFunctionModel>
    )

    console.log({ subFunctions })

    return subFunctions
  },

  // Buscar padrões de performance por subfunção
  getPerformanceStandards: async (subFunctionId: string) => {
    // const response = await api.get(`/performance-standards?filters[subFunction][id][$eq]=${subFunctionId}&populate=*`)
    // return response.data
    return []
  },

  // Buscar capabilities SAEP
  getCapabilitiesSaep: async () => {
    // const response = await api.get("/capabilities-saep?populate=*")
    // return response.data
    return []
  },

  // Buscar capabilities
  getCapabilities: async () => {
    // const response = await api.get("/capabilities?populate=*")
    // return response.data
    return []
  },

  // Buscar conhecimentos
  getKnowledges: async () => {
    // const response = await api.get("/knowledges?populate=*")
    // return response.data
    return []
  },

  // Criar item de questão
  createQuestionItem: async (data: any) => {
    // const response = await api.post("/question-items", { data })
    // return response.data
    return []
  },

  // Upload de arquivo
  uploadFile: async (file: any) => {
    const formData = new FormData()
    formData.append('files', file)
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
