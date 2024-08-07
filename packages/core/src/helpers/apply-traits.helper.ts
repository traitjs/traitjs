import { ITrait } from "../interfaces/i-trait.interface";
import { Type } from "../types/type.type";
import { normalizeTraits } from "./normalize-traits.helper";
import { resolveTraits } from "./resolve-traits.helper";

export const applyTraits = <TTarget extends Type<any>, TOptions>(
  target: TTarget,
  traits: ITrait<TOptions>[],
  options: TOptions
) => {
  const normalizedTraits = normalizeTraits(traits, options);
  return resolveTraits(target, normalizedTraits, options);
};
