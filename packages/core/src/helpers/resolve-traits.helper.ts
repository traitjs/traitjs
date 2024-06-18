import { ITrait } from "../interfaces/i-trait.interface";

export const resolveTraits = <TOptions>(
  target: any,
  traits: ITrait<TOptions>[],
  options: TOptions
) =>
  traits.reduce((acc, trait) => {
    return trait.traitFn(acc, options);
  }, target);
