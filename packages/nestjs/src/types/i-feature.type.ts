import { ITrait } from "@traitjs/core";

export type IFeature<TOptions extends any, TKey extends string = string> = {
  [K in TKey]: ITrait<TOptions>;
};
