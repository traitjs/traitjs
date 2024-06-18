import { ITrait } from "../interfaces/i-trait.interface";
import { depthDependencies } from "./depth-dependencies.helper";
import { isDependentOn } from "./is-dependent-on.helper";

export function normalizeTraits<TOptions>(traits: ITrait<TOptions>[]) {
  const treatedTraits = traits
    .concat(traits.flatMap((trait) => depthDependencies(trait)))
    .filter((trait, index, self) => self.indexOf(trait) === index)
    .sort((a, b) => {
      if (isDependentOn(a, b)) return 1;
      if (isDependentOn(b, a)) return -1;
      return (a.dependsOn?.length ?? 0) - (b.dependsOn?.length ?? 0);
    });
  return treatedTraits;
}
