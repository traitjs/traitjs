import { Type } from "../types/type.type";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";
import { AbstractType } from "../types/abstract-type.type";
import { makeRandomId } from "./make-random-id.helper";
import { makeActivator } from "./make-activator.helper";

export const makeAbstractTrait = <
  TOptions extends any,
  TResult extends Type<any> | AbstractType<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [] = [],
>(
  traitFn: InferTraitFnType<TOptions, TResult, TDependsOn>,
  dependsOn?: TDependsOn,
  activator?: (options: TOptions) => boolean
) => {
  return {
    uniqueId: makeRandomId(16),
    traitFn,
    dependsOn,
    abstract: true,
    activator: makeActivator(dependsOn, activator),
  };
};
