import { ITrait } from "@traitjs/core";

export type IFeature<TOptions, TKey extends string = string> = {
  [K in TKey]: ITrait<TOptions>;
};
