import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { questionItemService } from "../services/questionItemService"
import { toast } from "sonner"

const schema = yup.object({
  textMd: yup.string().required("Texto da questão é obrigatório"),
  contextMd: yup.string().required("Contexto é obrigatório"),
  commandMd: yup.string().required("Comando é obrigatório"),
  difficulty: yup.string().oneOf(["FACIL", "MEDIO", "DIFICIL"]).required("Dificuldade é obrigatória"),
  functionId: yup.string().required("Função é obrigatória"),
  subFunctionId: yup.string().required("Subfunção é obrigatória"),
  performanceStandardId: yup.string().required("Padrão de performance é obrigatório"),
  capabilitiesSaepId: yup.string().when("capabilityId", {
    is: (val) => !val,
    then: (schema) => schema.required("Selecione uma capability SAEP ou capability"),
    otherwise: (schema) => schema.nullable(),
  }),
  capabilityId: yup.string().when("capabilitiesSaepId", {
    is: (val) => !val,
    then: (schema) => schema.required("Selecione uma capability SAEP ou capability"),
    otherwise: (schema) => schema.nullable(),
  }),
  knowledgeIds: yup.array().min(1, "Selecione pelo menos um conhecimento"),
  alternatives: yup
    .array()
    .min(2, "Deve haver pelo menos 2 alternativas")
    .of(
      yup.object({
        textMd: yup.string().required("Texto da alternativa é obrigatório"),
        isCorrect: yup.boolean(),
      }),
    )
    .test("exactly-one-correct", "Deve haver exatamente uma alternativa correta", (alternatives) => {
      const correctCount = alternatives?.filter((alt) => alt.isCorrect).length || 0
      return correctCount === 1
    }),
})

export const useQuestionForm = () => {
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      textMd: "",
      contextMd: "",
      commandMd: "",
      difficulty: "",
      functionId: "",
      subFunctionId: "",
      performanceStandardId: "",
      capabilitiesSaepId: "",
      capabilityId: "",
      knowledgeIds: [],
      alternatives: [
        { textMd: "", isCorrect: false },
        { textMd: "", isCorrect: false },
      ],
      attachments: [],
    },
  })

  const createMutation = useMutation({
    mutationFn: questionItemService.createQuestionItem,
    onSuccess: () => {
      toast.success("Item de avaliação criado com sucesso!")
      form.reset()
      queryClient.invalidateQueries(["question-items"])
    },
    onError: (error) => {
      toast.error("Erro ao criar item de avaliação: " + error.message)
    },
  })

  const handleSubmit = (data) => {
    // Transformar dados para o formato esperado pelo Strapi
    const payload = {
      textMd: data.textMd,
      contextMd: data.contextMd,
      commandMd: data.commandMd,
      difficulty: data.difficulty,
      function: data.functionId,
      subFunction: data.subFunctionId,
      performanceStandard: data.performanceStandardId,
      ...(data.capabilitiesSaepId && { capabilitiesSaep: data.capabilitiesSaepId }),
      ...(data.capabilityId && { capability: data.capabilityId }),
      knowledges: data.knowledgeIds,
      alternatives: data.alternatives,
      attachments: data.attachments,
    }

    createMutation.mutate(payload)
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading: createMutation.isPending,
  }
}
