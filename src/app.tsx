import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CreateQuestionPage } from "./pages/create-question-page"
import "./globals.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateQuestionPage />} />
        <Route path="/create-question" element={<CreateQuestionPage />} />
      </Routes>
    </Router>
  )
}

export default App
