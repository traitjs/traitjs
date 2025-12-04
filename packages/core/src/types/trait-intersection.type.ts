import { ITrait } from "../interfaces/i-trait.interface";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type TraitUnionType<T extends ITrait<any>[]> =
  T extends Array<infer U>
    ? U extends ITrait<any>
      ? InstanceType<ReturnType<U["traitFn"]>>
      : never
    : never;

export type TraitType<T extends ITrait<any>> = ReturnType<T["traitFn"]>;

export type TraitIntersectionType<T extends ITrait<any>[]> =
  UnionToIntersection<TraitUnionType<T>>;
