import { ConfigurationType } from './types/InputGroupType';
import useInputGroup from './hooks/useInputGroup';
import './App.css'

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
  const [inputFields, values, isValid] = useInputGroup({ inputs: initConfiguration });
  console.log('values', values);

  return (
    <div className='App'>
      <form>
        {inputFields}
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
}

export default App;
