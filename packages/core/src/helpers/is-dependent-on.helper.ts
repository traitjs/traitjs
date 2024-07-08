import { ITrait } from "../interfaces/i-trait.interface";

export const isDependentOn = <TOptions extends any>(
  a: ITrait<TOptions>,
  b: ITrait<TOptions>
): boolean => {
  return (
    (a.dependsOn?.some((x) => x.uniqueId === b.uniqueId) ?? false) ||
    (a.dependsOn?.some((x) => isDependentOn(x, b)) ?? false)
  );
};
