import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import RecipeContext from './context/RecipeContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  <RecipeContext>
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
  </RecipeContext>
)
