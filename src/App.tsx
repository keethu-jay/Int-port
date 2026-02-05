import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CursorFollower from './components/CursorFollower'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import { MouseProvider } from './context/MouseContext'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ResumePage from './pages/ResumePage'

function App() {
  return (
    <ErrorBoundary>
      <MouseProvider>
        <CursorFollower size={5} borderSize={18} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="resume" element={<ResumePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MouseProvider>
    </ErrorBoundary>
  )
}

export default App
