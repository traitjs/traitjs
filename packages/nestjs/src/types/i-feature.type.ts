import { ITrait } from "@traitjs/core";

export type IFeature<TOptions extends any, TKey extends string = any> = {
  [K in TKey]: ITrait<TOptions>;
};
