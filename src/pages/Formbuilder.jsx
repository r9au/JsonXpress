import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect} from 'react'
import { useFieldArray,useFormContext, useWatch } from 'react-hook-form'
export default function Formbuilder({name}) {
    const {control,register,setValue,getValues} =useFormContext()
    const { fields, append, remove } = useFieldArray({
    control,
    name
  })
  // const onSubmit=(data)=>{
  //   console.log(data)
  // }
  const options=[
    {label:"String",value:"String"},
    {label:"number",value:"number"},
    {label:"boolean",value:"boolean"},
    {label:"nested",value:"nested"}
  ]
  const value=useWatch({
          control,
          name
        })
        useEffect(() => {
          if(!value) return
          value.forEach((field,index)=>{
            if(field?.type==="nested"){
              const path=`${name}.${index}.children`
              const curr=getValues(path)
              if(!Array.isArray(curr)){ 
                  setValue(path,[])
              }
            }
          })
        }, [value,name,getValues,setValue])
  return (
    <div className='flex flex-col items-start'>
      {fields && fields.map((field,index) => {
        const path=`${name}.${index}`
        const type=value?.[index]?.type
              return (<div className="formcntrl flex flex-col justify-center align-middle" key={field.id}>
                <div className="m-2 w-fit">
                  <section className='flex gap-1 justify-between w-fit'>
                  <Label className='text-x1 p-2 text-left w-1/2 inline'>field
                  <Input type="text" name='field' {...register(`${path}.field`)} placeholder='field' className='p-1 w-full my-2 mx-0 border-2 border-black'/>
                  </Label>
                  <Label className='text-x1 p-2 text-left w-1/2 inline'>type
                  <select type="text" name='type' {...register(`${path}.type`)} placeholder='type' className='p-1.5 w-full my-2 mx-0  border-2 border-black rounded-md'>
                    {options.map(option=>(
                      <option value={option.value} key={option.label}>{option.label}</option>
                    ))}
                    </select> 
                  </Label>
                  {index >= 0 &&
                    <span className="rm">
                      <Button variant="outline" type='button' onClick={() => remove(index)} className='w-fit h-2/5 mt-8'>remove</Button>
                    </span>}
                  </section>          
                    {type==="nested" && getValues(`${path}.children`) && (
                      <div className=''>
                        <Formbuilder name={`${path}.children`} />
                      </div>            
                    )}
                </div>
              </div>)
            })}
            {fields.length===0?<Button onClick={() => append({field:"",type:""})} className='w-1/6 bg-blue-600 text-xl text-left text-white rounded-md indent-2 relative'>Add</Button>:<Button onClick={() => append({field:"",type:""})} className='w-full bg-blue-800 text-xl text-left text-white rounded-md indent-2'>Add</Button>}
    </div>)
}

