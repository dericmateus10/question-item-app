'use server'
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar token de autenticação se necessário
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer a03fbb5f330771864a1ecdb4a055e947a7cb8e3e8903b32ad3ea507c4c8ac4eeb8715f40e5e6892644e950bda8b7324576d5fadef587aa4e9b652f7b464cd0cdd777a84c83984e82e288eed1b52ef795b978a465b94a4eb78a59eb3a9a49085d4b0a58dbe25d94321978fd03243f3bb4998f1dda74abedde3645b6e2ab761105`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default api
