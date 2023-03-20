import { ConfigurationMetaDataType } from "../types/InputGroupType";


export const required = (val: any) => !!val.toString().length;


export const checkIsValid = (
  obj: ConfigurationMetaDataType,
  value: string
): boolean => {
  for (let i = 0; i < obj.rules.length; i++) {
    if (!obj.rules[i](value)) {
      return false;
    }
  }
  return true;
};