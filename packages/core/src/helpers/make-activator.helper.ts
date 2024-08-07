import { ITrait } from "../interfaces/i-trait.interface";

export const makeActivator = <
  TOptions extends any,
  TDependsOn extends Array<ITrait<TOptions>>,
>(
  dependsOn?: TDependsOn,
  activator?: (options: TOptions) => boolean
) => {
  if (!dependsOn) {
    return activator;
  }
  if (!activator) {
    return (options: TOptions): boolean =>
      dependsOn.reduce(
        (acc, trait) => acc && (!trait.activator || trait.activator(options)),
        true
      );
  }
  return (options: TOptions): boolean =>
    dependsOn.reduce(
      (acc, trait) => acc && (!trait.activator || trait.activator(options)),
      true
    ) && activator(options);
};
