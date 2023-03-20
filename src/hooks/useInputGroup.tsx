import React, { useEffect, useRef, useState } from "react";
import { ConfigurationMetaDataType, ConfigurationType, configTypeToInputAttrs } from "../types/InputGroupType";
import { checkIsValid, required } from "../utils/validators";


type ConfigurationProps = {
  inputs: ConfigurationType[];
};


const useInputGroup = ({
  inputs,
}: ConfigurationProps): [JSX.Element[], { [key: string]: string }, boolean] => {
  const inputsMetaData = useRef<{ [k: string]: ConfigurationMetaDataType }>();
  const [values, setValues] = useState((): { [key: string]: string } => {
    return inputs.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: field.defaultValue || "",
      }),
      {}
    );
  });
  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);

  useEffect(() => {
    const invalid: string[] = [];
    inputsMetaData.current = inputs.reduce((acc, input) => {
      const currentInput: ConfigurationMetaDataType = {
        ...input,
        valid: false,
        rules: [],
      };
      if (input.required) {
        currentInput.rules.push(required);
      }
      const isInputValid = checkIsValid(currentInput, input.defaultValue || "");
      currentInput.valid = isInputValid;
      if (!isInputValid) {
        invalid.push(input.id);
      }
      return { ...acc, [input.id]: currentInput };
    }, {});
    
    setInvalidInputs(invalid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentElement = inputsMetaData.current![name];
    const isInputValid = checkIsValid(currentElement, value);
    currentElement.valid = isInputValid;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (isInputValid) {
      invalidInputs.includes(currentElement.id) &&
        setInvalidInputs((prev) =>
          prev.filter((item) => item !== currentElement.id)
        );
    } else {
      !invalidInputs.includes(currentElement.id) &&
        setInvalidInputs((prev) => [...prev, currentElement.id]);
    }
  };

  const inputFields = inputs.map((input) => {
    return (
      <input
        key={input.id}
        value={values[input.id]}
        name={input.id}
        placeholder={input.label}
        onChange={handleChange}
        className={invalidInputs.includes(input.id) ? 'input-error' : ''}
        {...configTypeToInputAttrs[input.type]}
      />
    );
  });

  return [inputFields, values, !invalidInputs.length];
};

export default useInputGroup;
