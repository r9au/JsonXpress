import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useForm, FormProvider } from 'react-hook-form'
import './index.css'
import App from './App.jsx'
function Appwrap(){
const methods=useForm({defaultValues:{jsoncode:[]}})
return (
  <FormProvider {...methods}>
    <App />
    </FormProvider>
)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrap/>
  </StrictMode>,
)
