import last from "lodash.last";
import { ITrait } from "../interfaces/i-trait.interface";
import { depthDependencies } from "./depth-dependencies.helper";
import { isDependentOn } from "./is-dependent-on.helper";

const dependenciesCount = (trait: ITrait<any>): number =>
  (trait.dependsOn?.length ?? 0) +
  (trait.dependsOn?.reduce((acc, trait) => acc + dependenciesCount(trait), 0) ??
    0);

export const normalizeTraits = <TOptions>(traits: ITrait<TOptions>[]) => {
  const treatedTraits = traits
    .concat(traits.flatMap((trait) => depthDependencies(trait)))
    .filter(
      (trait, index, self) =>
        self.findIndex((x) => x.uniqueId === trait.uniqueId) === index
    )
    .sort((a, b) => {
      if (isDependentOn(a, b)) return 1;
      if (isDependentOn(b, a)) return -1;
      if (a.abstract && !b.abstract) return -1;
      if (b.abstract && !a.abstract) return 1;
      return dependenciesCount(a) - dependenciesCount(b);
    });
  if (last(treatedTraits)?.abstract) {
    throw new Error("The last trait in the list cannot be abstract");
  }
  return treatedTraits;
};
