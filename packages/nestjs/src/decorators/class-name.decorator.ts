import { Type } from "@traitjs/core";

export const ClassName = (className: string) => (target: Type<any>) => {
  Object.defineProperty(target, "name", { value: className });
};
