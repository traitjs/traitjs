import { Type } from "@nestjs/common";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";

export const makeTrait = <
  TOptions,
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
