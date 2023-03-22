import { memo } from 'react';
import { ConfigurationType } from '../types/InputGroupType';
import Input from './Input';

type InputGroupProps = {
  inputs: ConfigurationType[],
  setValues: React.Dispatch<React.SetStateAction<{}>>,
  setInvalidInputs: React.Dispatch<React.SetStateAction<string[]>>,
}

function InputGroup({inputs, setValues, setInvalidInputs}: InputGroupProps) {
  return (
    <>
      {inputs.map(input => 
        <Input 
          key={input.id}
          id={input.id}
          type={input.type}
          defaultValue={input.defaultValue}
          label={input.label}
          required={input.required}
          setValues={setValues}
          setInvalidInputs={setInvalidInputs}
        />
      )}
    </>
  )
}

export default memo(InputGroup)