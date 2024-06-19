import { ITrait } from "../interfaces/i-trait.interface";

export const depthDependencies = <TOptions extends any>(
  trait: ITrait<TOptions>
): ITrait<TOptions>[] => {
  return trait.dependsOn?.flatMap((x) => [x, ...depthDependencies(x)]) || [];
};
