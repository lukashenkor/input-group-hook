export type Rules = Array<(val: any) => boolean>

export const checkRequired = (val: any) => !!val.toString().length;


export const checkIsValid = (
  rules: Rules,
  value: string
): boolean => {
  for (let i = 0; i < rules.length; i++) {
    if (!rules[i](value)) {
      return false;
    }
  }
  return true;
};