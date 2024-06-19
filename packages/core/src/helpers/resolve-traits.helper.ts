import { ITrait } from "../interfaces/i-trait.interface";
import { Type } from "../types/type.type";

export const resolveTraits = <TOptions>(
  target: Type<any>,
  traits: ITrait<TOptions>[],
  options: TOptions
) =>
  traits.reduce((acc, trait) => {
    return trait.traitFn(acc, options);
  }, target);
