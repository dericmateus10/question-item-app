import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { QuestionForm } from "@/components/organisms/question-form"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export const CreateQuestionPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Criar Item de Avaliação</h1>
              <p className="text-muted-foreground mt-2">
                Preencha os campos abaixo para criar um novo item de avaliação.
              </p>
            </div>

            <QuestionForm />
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  )
}

export default CreateQuestionPage
