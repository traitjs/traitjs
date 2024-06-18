import { Type } from "@nestjs/common";
import { TraitUnionType } from "./trait-union.type";
import { ITrait } from "../interfaces/i-trait.interface";

export type InferTraitFnType<
  TOptions,
  TResult extends Type<any>,
  F extends Array<ITrait<TOptions>> | [],
> = F extends []
  ? (target: Type<any> | undefined, options: TOptions) => TResult
  : F extends Array<ITrait<TOptions>>
    ? (target: TraitUnionType<F>, options: TOptions) => TResult
    : never;
