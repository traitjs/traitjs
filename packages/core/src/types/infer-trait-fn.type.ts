import { ITrait } from "../interfaces/i-trait.interface";
import { AbstractType } from "./abstract-type.type";
import { TraitIntersectionType, TraitType } from "./trait-intersection.type";
import { Type } from "./type.type";

type ConstructorOf<T> = new (...args: any[]) => T;

export type InferTraitFnType<
  TOptions,
  TResult extends Type<any> | AbstractType<any>,
  TDependsOn extends Array<ITrait<TOptions>> | [],
> = TDependsOn extends []
  ? (target: undefined, options: TOptions) => TResult
  : TDependsOn extends [ITrait<TOptions>]
    ? (target: TraitType<TDependsOn[0]>, options: TOptions) => TResult
    : TDependsOn extends Array<ITrait<TOptions>>
      ? (
          target: ConstructorOf<TraitIntersectionType<TDependsOn>>,
          options: TOptions
        ) => TResult
      : never;
