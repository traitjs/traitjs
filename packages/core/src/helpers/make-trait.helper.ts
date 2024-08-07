import { Type } from "../types/type.type";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";
import { makeRandomId } from "./make-random-id.helper";
import { makeActivator } from "./make-activator.helper";

export const makeTrait = <
  TOptions extends any,
  TResult extends Type<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [] = [],
>(
  traitFn: InferTraitFnType<TOptions, TResult, TDependsOn>,
  dependsOn?: TDependsOn,
  activator?: (options: TOptions) => boolean
) => {
  [].filter;
  return {
    uniqueId: makeRandomId(16),
    traitFn,
    dependsOn,
    activator: makeActivator(dependsOn, activator),
  };
};
