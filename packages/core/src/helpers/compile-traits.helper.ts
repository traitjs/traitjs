import { ITrait } from "../interfaces/i-trait.interface";
import { normalizeTraits } from "./normalize-traits.helper";
import { resolveTraits } from "./resolve-traits.helper";

export const compileTraits = <TOptions>(
  traits: ITrait<TOptions>[],
  options: TOptions
) => {
  if (traits.length === 0) return class {};
  const normalizedTraits = normalizeTraits<TOptions>(traits, options);
  const firstTrait = normalizedTraits.shift()!;
  const result = firstTrait.traitFn(undefined, options);
  return resolveTraits(result, normalizedTraits, options);
};
