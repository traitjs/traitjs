import { Type } from "../types/type.type";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";

export const makeTrait = <
  TOptions extends any,
  TResult extends Type<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [] = [],
>(
  traitFn: InferTraitFnType<TOptions, TResult, TDependsOn>,
  dependsOn?: TDependsOn
) => {
  return {
    traitFn,
    dependsOn,
  };
};
