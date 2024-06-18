import { ITrait } from "../interfaces/i-trait.interface";

export const isDependentOn = <TOptions>(
  a: ITrait<TOptions>,
  b: ITrait<TOptions>
): boolean => {
  return (
    (a.dependsOn?.includes(b) ?? false) ||
    (a.dependsOn?.some((x) => isDependentOn(x, b)) ?? false)
  );
};
