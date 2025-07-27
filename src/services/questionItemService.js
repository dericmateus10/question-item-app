import api from "./api"

export const questionItemService = {
  // Buscar funções
  getFunctions: async () => {
    const response = await api.get("/functions?populate=*")
    return response.data
  },

  // Buscar subfunções por função
  getSubFunctions: async (functionId) => {
    const response = await api.get(`/sub-functions?filters[function][id][$eq]=${functionId}&populate=*`)
    return response.data
  },

  // Buscar padrões de performance por subfunção
  getPerformanceStandards: async (subFunctionId) => {
    const response = await api.get(`/performance-standards?filters[subFunction][id][$eq]=${subFunctionId}&populate=*`)
    return response.data
  },

  // Buscar capabilities SAEP
  getCapabilitiesSaep: async () => {
    const response = await api.get("/capabilities-saep?populate=*")
    return response.data
  },

  // Buscar capabilities
  getCapabilities: async () => {
    const response = await api.get("/capabilities?populate=*")
    return response.data
  },

  // Buscar conhecimentos
  getKnowledges: async () => {
    const response = await api.get("/knowledges?populate=*")
    return response.data
  },

  // Criar item de questão
  createQuestionItem: async (data) => {
    const response = await api.post("/question-items", { data })
    return response.data
  },

  // Upload de arquivo
  uploadFile: async (file) => {
    const formData = new FormData()
    formData.append("files", file)
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
}
