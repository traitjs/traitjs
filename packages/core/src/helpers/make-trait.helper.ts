import { Type } from "../types/type.type";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";
import { makeRandomId } from "./make-random-id.helper";

export const makeTrait = <
  TOptions extends any,
  TResult extends Type<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [] = [],
>(
  traitFn: InferTraitFnType<TOptions, TResult, TDependsOn>,
  dependsOn?: TDependsOn
) => {
  return {
    uniqueId: makeRandomId(16),
    traitFn,
    dependsOn,
  };
};
