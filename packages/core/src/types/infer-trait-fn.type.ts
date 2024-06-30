import { ITrait } from "../interfaces/i-trait.interface";
import { AbstractType } from "./abstract-type.type";
import { TraitUnionType } from "./trait-union.type";
import { Type } from "./type.type";

export type InferTraitFnType<
  TOptions,
  TResult extends Type<any> | AbstractType<any>,
  F extends Array<ITrait<TOptions>> | [],
> = F extends []
  ? <TExpected extends any = any>(
      target: Type<TExpected> | undefined,
      options: TOptions
    ) => TResult
  : F extends Array<ITrait<TOptions>>
    ? (target: TraitUnionType<F>, options: TOptions) => TResult
    : never;
