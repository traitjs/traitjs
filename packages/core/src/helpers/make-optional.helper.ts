import { ITrait } from "../interfaces/i-trait.interface";
import { makeActivator } from "./make-activator.helper";

export const makeOptional = <TOptions>(
  trait: ITrait<TOptions>,
  activator: (options: TOptions) => boolean
) => {
  return {
    ...trait,
    activator: makeActivator(
      trait.dependsOn,
      trait.activator
        ? (options: TOptions) => trait.activator!(options) && activator(options)
        : activator
    ),
  };
};
