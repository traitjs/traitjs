import { Type } from "../types/type.type";
import { InferTraitFnType } from "../types/infer-trait-fn.type";
import { ITrait } from "../interfaces/i-trait.interface";
import { AbstractType } from "../types/abstract-type.type";

export const makeAbstractTrait = <
  TOptions extends any,
  TResult extends Type<any> | AbstractType<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [] = [],
>(
  traitFn: InferTraitFnType<TOptions, TResult, TDependsOn>,
  dependsOn?: TDependsOn
) => {
  return {
    traitFn,
    dependsOn,
    abstract: true,
  };
};
