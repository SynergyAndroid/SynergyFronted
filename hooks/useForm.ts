//유효성검증을 위한 hook

import {useState,useEffect} from "react";


interface UseFormProps<T> {
    initialValue:T;
    //제너릭타입으로 줄것이다. 
    validate:(value:T)=>Record<keyof T,string>;

}

function useForm<T>({initialValue,validate}:UseFormProps<T> ){
    const [values, setValues]=useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    

    const handleChangeText = (name:keyof T ,text:string)=> {
        setValues({
          ...values,
          [name]:text,
        })
      };
    
      //블러처리 
      const handleBlur = (name:keyof T)=>{
        setTouched({
          ...touched,
          [name]:true,
        });
      };

      const getTextInputProps = (name:keyof T)=> {
        const value = values[name];
        const onChangeText = (text:string)=>handleChangeText(name, text);
        const onBlur=() => handleBlur(name);

        return{value ,onChangeText, onBlur} //객체로 반환함 
      };

      useEffect(()=> {
        const newErros = validate(values)
        setErrors(newErros);

      },[validate,values]);

      
    return {values,errors,touched,getTextInputProps};

}



export default useForm;