import { useEffect, useState } from 'react'
import { ScrollArea } from './components/ui/scroll-area'
import './App.css'
import {FormProvider, useForm,useWatch} from 'react-hook-form'
import Formbuilder from './pages/Formbuilder'
import { Button } from './components/ui/button'

function App() {
  const [output, setoutput] = useState()
  const methods = useForm({
    defaultValues: {
      jsoncode: []
    }
  })
  const {control}=methods
  const schema= useWatch({
    control,
    name: "jsoncode"
  });
  const buildjson=(fields)=>{
    const result={};
    (fields || []).forEach(field=>{
      if(!field?.field) return {"":""};
      if(field.type==="nested"){
        result[field.field]=buildjson(Array.isArray(field.children)? field.children : [])
      }else{
        result[field.field]=field.type
      }
    })
    return result
  }
  useEffect(() => {
    const obj=buildjson(schema)
    setoutput(JSON.stringify(obj,null,2))
  }, [schema])
  
  return (
    <>
    <FormProvider {...methods}>
      <div className="flex justify-between top my-8 gap-[2rem]">
        <ScrollArea className="h-100 w-1/2 rounded-md border p-4">
          <Formbuilder name="jsoncode"/>
        </ScrollArea>
        <ScrollArea className="h-100 w-1/2 rounded-md border p-4"><div className='text-md text-gray-500 relative top-1 left-0 w-1/6'>Json Output-</div>{output}</ScrollArea>
      </div>
      <div className="flex items-start">
         <Button variant="outline" className="w-1/9 relative left-0 p-4 text-md">Submit</Button>
      </div>
      </FormProvider>
    </>
  )
}

export default App
