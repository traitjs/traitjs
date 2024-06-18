import { ITrait } from "@traitjs/core";
import { IFeature } from "./i-feature.type";

export type IGroupedFeatures<
  TOptions extends any,
  TFeature extends IFeature<any>,
> = {
  [key in keyof TFeature]: ITrait<TOptions>[];
};
