import { useQuery } from '@tanstack/react-query'
import { questionItemService } from '../services/questionItemService'

export const useApiData = () => {
  console.log('useApiData hook called')

  const functionsQuery = useQuery({
    queryKey: ['functions'],
    queryFn: async () => {
      const response = await questionItemService.getFunctions()
      return response
    },
  })

  const capabilitiesSaepQuery = useQuery({
    queryKey: ['capabilities-saep'],
    queryFn: async () => {
      const response = await questionItemService.getCapabilitiesSaep()
      return response
    },
  })

  const capabilitiesQuery = useQuery({
    queryKey: ['capabilities'],
    queryFn: async () => {
      const response = await questionItemService.getCapabilities()
      return response
    },
  })

  const knowledgesQuery = useQuery({
    queryKey: ['knowledges'],
    queryFn: async () => {
      const response = await questionItemService.getKnowledges()
      return response
    },
  })

  const getSubFunctions = (functionId) => {
    return {
      queryKey: ['sub-functions', functionId],
      queryFn: () => questionItemService.getSubFunctions(functionId),
      enabled: !!functionId,
    }
  }

  const getPerformanceStandards = (subFunctionId) => {
    // This function should not call useQuery directly
    // Instead, it should return a query key and function for useQuery to be called outside
    return {
      queryKey: ['performance-standards', subFunctionId],
      queryFn: () => questionItemService.getPerformanceStandards(subFunctionId),
      enabled: !!subFunctionId,
    }
  }

  console.log('useApiData hook returning data:', {
    functions: functionsQuery.data,
    capabilitiesSaep: capabilitiesSaepQuery.data,
    capabilities: capabilitiesQuery.data,
    knowledges: knowledgesQuery.data,
    isLoading:
      functionsQuery.isLoading ||
      capabilitiesSaepQuery.isLoading ||
      capabilitiesQuery.isLoading ||
      knowledgesQuery.isLoading,
    errors: {
      functions: functionsQuery.error,
      capabilitiesSaep: capabilitiesSaepQuery.error,
      capabilities: capabilitiesQuery.error,
      knowledges: knowledgesQuery.error,
    },
  })

  return {
    functions: functionsQuery.data || [],
    capabilitiesSaep: capabilitiesSaepQuery.data?.data || [],
    capabilities: capabilitiesQuery.data?.data || [],
    knowledges: knowledgesQuery.data?.data || [],
    isLoading:
      functionsQuery.isLoading ||
      capabilitiesSaepQuery.isLoading ||
      capabilitiesQuery.isLoading ||
      knowledgesQuery.isLoading,
    getSubFunctions,
    getPerformanceStandards,
  }
}
