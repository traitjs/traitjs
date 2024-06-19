import { ITrait } from "../interfaces/i-trait.interface";
import { TraitUnionType } from "./trait-union.type";
import { Type } from "./type.type";

export type InferTraitFnType<
  TOptions,
  TResult extends Type<any>,
  F extends Array<ITrait<TOptions>> | [],
> = F extends []
  ? (target: Type<any> | undefined, options: TOptions) => TResult
  : F extends Array<ITrait<TOptions>>
    ? (target: TraitUnionType<F>, options: TOptions) => TResult
    : never;
