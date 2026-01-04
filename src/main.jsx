import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calculator from './Calculaltor.jsx'
import Todo from './TaskList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calculator />
    <Todo/>
  </StrictMode>,
)
