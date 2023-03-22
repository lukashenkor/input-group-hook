import React, { useEffect, useRef, useState } from 'react'
import { ConfigurationType, configTypeToInputAttrs } from '../types/InputGroupType';
import { Rules, checkIsValid, checkRequired } from "../utils/validators";

type InputProps = ConfigurationType & {
  setValues: React.Dispatch<React.SetStateAction<{}>>,
  setInvalidInputs: React.Dispatch<React.SetStateAction<string[]>>,
}

function Input({
  id,
  label,
  type,
  defaultValue,
  required,
  setValues,
  setInvalidInputs
}: InputProps) {
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const [inputValid, setInputValid] = useState(true);
  const inputRules = useRef<Rules>([]);


  useEffect(() => {
    if (required) {
      inputRules.current.push(checkRequired);
    }
    setInputValid(checkIsValid(inputRules.current, defaultValue || ""));    
    setValues(prev => ({...prev, [id]: ''}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (!inputValid) {
      setInvalidInputs(prev => [...prev, id])
    } else {
      setInvalidInputs(prev => prev.filter(inputId => inputId !== id))
    }
  }, [id, setInvalidInputs, inputValid]);
  
  
  useEffect(() => {
    setValues(prev => ({...prev, [id]: inputValue}))
    setInputValid(checkIsValid(inputRules.current, inputValue));
  }, [id, setValues, inputValue])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputValue(value);
  }

  return (
    <>
      <input
        value={inputValue}
        name={id}
        placeholder={label}
        onChange={handleChange}
        className={!inputValid ? 'input-error' : ''}
        {...configTypeToInputAttrs[type]}
      />
    </>
  )
}

export default Input