import { useQuery } from "@tanstack/react-query"
import { questionItemService } from "../services/questionItemService"

export const useApiData = () => {
  const functionsQuery = useQuery({
    queryKey: ["functions"],
    queryFn: questionItemService.getFunctions,
  })

  const capabilitiesSaepQuery = useQuery({
    queryKey: ["capabilities-saep"],
    queryFn: questionItemService.getCapabilitiesSaep,
  })

  const capabilitiesQuery = useQuery({
    queryKey: ["capabilities"],
    queryFn: questionItemService.getCapabilities,
  })

  const knowledgesQuery = useQuery({
    queryKey: ["knowledges"],
    queryFn: questionItemService.getKnowledges,
  })

  const getSubFunctions = (functionId) => {
    // This function should not call useQuery directly
    // Instead, it should return a query key and function for useQuery to be called outside
    return {
      queryKey: ["sub-functions", functionId],
      queryFn: () => questionItemService.getSubFunctions(functionId),
      enabled: !!functionId,
    }
  }

  const getPerformanceStandards = (subFunctionId) => {
    // This function should not call useQuery directly
    // Instead, it should return a query key and function for useQuery to be called outside
    return {
      queryKey: ["performance-standards", subFunctionId],
      queryFn: () => questionItemService.getPerformanceStandards(subFunctionId),
      enabled: !!subFunctionId,
    }
  }

  return {
    functions: functionsQuery.data?.data || [],
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
