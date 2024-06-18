export type TraitUnionType<T extends Array<any>> = T extends [
  {
    traitFn: (...args: any[]) => infer Head;
  },
  ...infer Rest,
]
  ? Head & TraitUnionType<Rest>
  : unknown;
