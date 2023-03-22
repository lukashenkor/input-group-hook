import { ConfigurationType } from './types/InputGroupType';
import useInputGroup from './hooks/useInputGroup';
import './App.css'
import InputGroup from './components/InputGroup';
import { useState } from 'react';


enum SolutionType {
  COMPONENT = "component",
  HOOK = "hook"
}

const initConfiguration: ConfigurationType[] = [
  {
    id: "first_name",
    type: "inputText",
    label: "First Name",
    defaultValue: "Some first name"
  },
  {
    id:  "last_name",
    type: "inputText",
    label: "Last Name"
  },
  {
    id: "email",
    type: "inputEmail",
    label: "Email",
    required: true
  },
  {
    id: "password",
    type: "inputPassword",
    label: "Password",
    required: true
  },
]

function App() {  
  const [inputFields, useInputGroupValues, isValid] = useInputGroup({ inputs: initConfiguration });
  const [invalidInputs, setInvalidInputs] = useState<string[]>([])
  const [values, setValues] = useState({})
  const [solutionType, setSolutionType] = useState<string>(SolutionType.COMPONENT)
  

  return (
    <div className="App">
      <div className="choose-render-block">
        <label htmlFor="component-radio">
          <input
            id="component-radio"
            type="radio"
            value="component"
            name="choose-render"
            checked={solutionType === SolutionType.COMPONENT}
            onChange={(e) => setSolutionType(e.target.value)}
          />
          Using component
        </label>
        <br />
        <label htmlFor="hook-radio">
          <input
            id="hook-radio"
            type="radio"
            value="hook"
            name="choose-render"
            checked={solutionType === SolutionType.HOOK}
            onChange={(e) => setSolutionType(e.target.value)}
          />
          Using hook
        </label>
      </div>
      {solutionType === SolutionType.HOOK && <form>
        {inputFields}
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
      }
      {solutionType === SolutionType.COMPONENT && <form>
        <InputGroup
          inputs={initConfiguration}
          setValues={setValues}
          setInvalidInputs={setInvalidInputs}
        />
        <button type="submit" disabled={!!invalidInputs.length}>
          Submit
        </button>
      </form>}
    </div>
  );
}

export default App;
