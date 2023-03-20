export type ConfigurationType = {
  id: string,
  type: "inputText" | "inputEmail" | "inputPassword",
  label?: string,
  defaultValue?: string,
  required?: boolean
};

export type ConfigurationMetaDataType = ConfigurationType & {
  rules: Array<(val: any) => boolean>;
  valid: boolean;
};

export const configTypeToInputAttrs = {
  inputText: {
    type: "text",
  },
  inputEmail: {
    type: "email",
    placeholder: "someemail@example.com",
  },
  inputPassword: {
    type: "password",
    placeholder: "Password",
  },
};