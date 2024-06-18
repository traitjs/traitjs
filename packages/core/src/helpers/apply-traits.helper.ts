import { ITrait } from "../interfaces/i-trait.interface";
import { normalizeTraits } from "./normalize-traits.helper";
import { resolveTraits } from "./resolve-traits.helper";

export const applyTraits = <TTarget extends any, TOptions>(
  target: TTarget,
  traits: ITrait<TOptions>[],
  options: TOptions
) => {
  const normalizedTraits = normalizeTraits(traits);
  return resolveTraits(target, normalizedTraits, options);
};
